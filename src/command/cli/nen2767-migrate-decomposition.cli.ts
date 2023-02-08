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
 * npm run console nen2767:migrate-decomposition
 */
@Injectable()
export class Nen2767MigrateDecompositionCli {
	private static CLI_COMMAND = 'nen2767:migrate-decomposition';

	private graphqlClient: GraphQLClient;

	private report: {
		log: string[];
		errors: Array<{
			objectId: string;
			error: string;
		}>;
		successObjectIds: string[];
		successSurveyIds: string[];
		failedObjectIds: string[];
		failedSurveyIds: string[];
	} = {
		log: [],
		errors: [],
		successObjectIds: [],
		successSurveyIds: [],
		failedObjectIds: [],
		failedSurveyIds: [],
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
				command: Nen2767MigrateDecompositionCli.CLI_COMMAND,
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
			this.report.errors.push(...errors.map((error) => ({ error, objectId })));
		} catch (err) {
			this.report.errors.push({
				error: `[UNCAUGHT EXCEPTION] ${code} ${err.message}`,
				objectId,
			});
		}

		this.progressTracker += 1;
		this.progressBar.update(this.progressTracker);
	}

	/**
	 * Allows testing with a limited set of object codes by setting an .env var
	 */
	private limitObjects(objects: { id: string; code: string }[]): { id: string; code: string }[] {
		const commaSeparatedObjectCodes = this.configService.get<string>('NEN2767_MIGRATION_OBJECT_CODES');
		if (!commaSeparatedObjectCodes) {
			return objects;
		}
		const objectCodes = commaSeparatedObjectCodes.split(',');
		return objects.filter(({ code }) => objectCodes.includes(code));
	}

	private async run() {
		this.logger.verbose(`Finding objects with Nen2767 decomposition...`);

		const { findObjectsWithNen2767Decomposition: objectsWithNen2767Decomposition } =
			await this.externalAIPGraphQLRepository.findObjectsWithNen2767Decomposition();

		const objectsToMigrate = this.limitObjects(objectsWithNen2767Decomposition);

		this.logger.verbose(
			`Queueing ${objectsToMigrate.length} ${
				objectsToMigrate.length !== 1 ? 'objects' : 'object'
			} for migration...`,
		);
		this.progressBar.start(objectsToMigrate.length, 0);

		const queue = new PQueue({ concurrency: 10 });
		objectsToMigrate.forEach(({ id, code }) => {
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
