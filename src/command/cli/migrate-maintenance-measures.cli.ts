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
 * npm run console migrate-maintenance-measures
 */
@Injectable()
export class MigrateMaintenanceMeasuresCli {
	private static CLI_COMMAND = 'migrate-maintenance-measures';

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
				command: MigrateMaintenanceMeasuresCli.CLI_COMMAND,
				description:
					'Determines all objects that have a maintenanceMeasures and performs a data migration for all maintenanceMeasures for each object',
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

	private async migrateMaintenanceMeasuresForObject(objectId: string, code: string) {
		try {
			const {
				migrateMaintenanceMeasures: { log, errors, failedSurveyIds, successSurveyIds },
			} = await this.externalAIPGraphQLRepository.migrateMaintenanceMeasures(objectId);

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
		const commaSeparatedObjectCodes = this.configService.get<string>('MAINTENANCE_MEASURES_MIGRATION_OBJECT_CODES');
		if (!commaSeparatedObjectCodes) {
			return objects;
		}
		const objectCodes = commaSeparatedObjectCodes.split(',');
		return objects.filter(({ code }) => objectCodes.includes(code));
	}

	private async run() {
		this.logger.verbose(`Finding objects with maintenanceMeasures...`);

		const { objectsWithMaintenanceMeasures } =
			await this.externalAIPGraphQLRepository.findObjectsWithMaintenanceMeasures();

		const objectsToMigrate = this.limitObjects(objectsWithMaintenanceMeasures);

		this.logger.verbose(
			`Queueing ${objectsToMigrate.length} ${
				objectsToMigrate.length !== 1 ? 'objects' : 'object'
			} for migration...`,
		);
		this.progressBar.start(objectsToMigrate.length, 0);

		const queue = new PQueue({ concurrency: 10 });
		objectsToMigrate.forEach(({ id, code }) => {
			queue.add(() => this.migrateMaintenanceMeasuresForObject(id, code));
		});

		await queue.onIdle();

		this.progressBar.stop();

		const fileName = `migrate-maintenance-measures-report_${new Date().toISOString().replace(':', '-')}.json`;
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
		this.logger.log(`Completed migrating ${objectsWithMaintenanceMeasures.length} objects`);
	}
}
