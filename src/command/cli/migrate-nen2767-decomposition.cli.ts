import * as fs from 'fs';
import * as path from 'path';

import { Injectable, Logger } from '@nestjs/common';
import { ConsoleService } from 'nestjs-console';
import { GraphQLClient } from 'graphql-request';
import { ConfigService } from '@nestjs/config';
import PQueue from 'p-queue';
import { SingleBar } from 'cli-progress';

import { ExternalAIPGraphQLRepository } from '../../externalRepository/ExternalAIPGraphQLRepository';

/**
 * npm run console migrate-nen2767-decomposition
 */
@Injectable()
export class MigrateNen2767DecompositionCli {
	private static CLI_COMMAND = 'migrate-nen2767-decomposition';

	private static DEBUG = true;

	private graphqlClient: GraphQLClient;

	private report: {
		success: string[];
		log: string[];
		errors: Array<{
			objectId: string;
			error: string;
		}>;
		successObjectIds: string[];
		successSurveyIds: string[];
		failedObjectIds: string[];
		failedSurveyIds: string[];
	};

	progressBar = new SingleBar({});

	progressTracker = 0;

	public constructor(
		private readonly consoleService: ConsoleService,
		private readonly logger: Logger,
		private configService: ConfigService,
		private readonly externalAIPGraphQLRepository: ExternalAIPGraphQLRepository,
	) {
		const cli = this.consoleService.getCli();

		this.consoleService.createCommand(
			{
				command: MigrateNen2767DecompositionCli.CLI_COMMAND,
				description:
					'Determines all objects that have a Nen2767 decomposition and performs a data migration for each',
			},
			this.run.bind(this),
			cli,
		);

		this.graphqlClient = new GraphQLClient(this.configService.get<string>('GRAPHQL_URL'), {
			headers: {
				Authorization: 'Bearer ' + this.configService.get<string>('AUTH_TOKEN'),
			},
		});
	}

	private async migrateDecompositionForObject(objectId: string, code: string) {
		this.logger.verbose('::', objectId, code);
		try {
			const {
				migrateNen2767Decomposition: { log, errors, failedSurveyIds, successSurveyIds },
			} = await this.externalAIPGraphQLRepository.migrateNen2767DecompositionForObject(objectId);

			this.report.successSurveyIds.push(...successSurveyIds);
			this.report.failedSurveyIds.push(...failedSurveyIds);

			if (failedSurveyIds.length) {
				this.report.failedObjectIds.push(objectId);
			} else {
				this.report.successObjectIds.push(objectId);
			}

			this.report.log.push(...log);
			this.report.errors.push(...errors.map((error) => ({ error: error, objectId })));
		} catch (err) {
			this.report.errors.push({
				error: `[CAUGHT EXCEPTION] ${err.message}`,
				objectId,
			});
		}

		this.progressTracker += 1;
		this.progressBar.update(this.progressTracker);
	}

	private async run() {
		this.logger.verbose(`Finding objects with Nen2767 decomposition...`);

		const { findObjectsWithNen2767Decomposition: objectsWithNen2767Decomposition } =
			await this.externalAIPGraphQLRepository.findObjectsWithNen2767Decomposition();

		this.logger.verbose(`Queueing ${objectsWithNen2767Decomposition.length} objects for migration...`);
		this.progressBar.start(objectsWithNen2767Decomposition.length, 0);

		const queue = new PQueue({ concurrency: 10 });
		objectsWithNen2767Decomposition.forEach(({ id, code }) => {
			queue.add(() => this.migrateDecompositionForObject(id, code));
		});

		await queue.onIdle();

		this.progressBar.stop();

		const fileName = `nen2767-migration-report_${new Date().toISOString()}.json`;
		this.logger.verbose(`Writing report to "${fileName}"`);
		fs.writeFileSync(path.resolve(process.cwd(), fileName), JSON.stringify(this.report), {
			encoding: 'utf-8',
		});

		if (this.report.errors.length) {
			this.logger.error('Errors (see report):', this.report.errors);
		}

		this.logger.verbose(`${this.report.successObjectIds.length} objects were successfully migrated`);
		this.logger.verbose(`${this.report.failedObjectIds.length} objects were NOT successfully migrated`);

		this.logger.log('');
		this.logger.log(`Completed migrating ${objectsWithNen2767Decomposition.length} objects`);
	}
}
