import { Module, CacheModule, Logger } from '@nestjs/common';
import { FileWriterService } from 'src/services/FileWriterService';
import { ConsoleModule } from 'nestjs-console';
import { ConfigService } from '@nestjs/config';
import { GraphQLRequestModule } from '@golevelup/nestjs-graphql-request';
import { Reflector } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';
import { CqrsModule } from '@nestjs/cqrs';

import { ObjectRepository } from '../schema/object/object.repository';
import { PrismaService } from '../prisma.service';
import { SurveyRepository } from '../schema/survey/survey.repository';
import { JunctionBoxRepository } from '../schema/span-installation/junction-box.repository';
import { SupportSystemRepository } from '../schema/span-installation/support-system.repository';
import { LuminaireRepository } from '../schema/span-installation/luminaire.repository';
import { ExternalAIPGraphQLRepository } from '../externalRepository/ExternalAIPGraphQLRepository';
import { UndoOVSImportService } from '../services/undo-ovs-import.service';
import { NormalizeOVSImportData } from '../services/NormalizeOVSImportData';
import { CorrectCoordinatesService } from '../services/correct-coordinates-service';
import { DuplicateInstallationGroupRemovalService } from '../services/DuplicateInstallationGroupRemovalService';
import { UpdateOVSPassport } from '../services/UpdateOVSPassport';

import { SetOVSSurveySurveyorsCommand } from './commands/set-ovs-survey-surveyors.command';
import { SetOVSSurveySurveyorsHandler } from './commands/set-ovs-survey-surveyors.handler';
import { SetOvsSurveySurveyorsService } from './set-ovs-survey-surveyors.service';
import { SetOvsSurveySurveyorsRepository } from './set-ovs-survey-surveyors.repository';
import { SetOvsSurveySurveyorCli } from './cli/set-ovs-survey-surveyor.cli';
import { CommandResolver } from './command.resolver';
import { Nen2767MigrateDecompositionService } from './nen2767-migrate-decomposition.service';
import { Nen2767MigrateDecompositionRepository } from './nen2767-migrate-decomposition.repository';
import { Nen2767MigrateDecompositionCommand } from './commands/nen2767-migrate-decomposition.command';
import { Nen2767MigrateDecompositionHandler } from './commands/nen2767-migrate-decomposition.handler';
import { Nen2767MigrateDecompositionCli } from './cli/nen2767-migrate-decomposition.cli';
import { Nen2767FindObjectsWithDecompositionQuery } from './queries/nen2767-find-objects-with-decomposition.query';
import { Nen2767FindObjectsWithDecompositionHandler } from './queries/nen2767-find-objects-with-decomposition.handler';
import { FindObjectsWithMaintenanceMeasuresQuery } from './queries/find-objects-with-maintenance-measures.query';
import { FindObjectsWithMaintenanceMeasuresHandler } from './queries/find-objects-with-maintenance-measures.handler';
import { MigrateMaintenanceMeasuresCommand } from './commands/migrate-maintenance-measures.command';
import { MigrateMaintenanceMeasuresHandler } from './commands/migrate-maintenance-measures.handler';
import { MigrateMaintenanceMeasuresService } from './migrate-maintenance-measures.service';
import { MigrateMaintenanceMeasuresRepository } from './migrate-maintenance-measures.repository';
import { MigrateMaintenanceMeasuresCli } from './cli/migrate-maintenance-measures.cli';

@Module({
	imports: [
		ConsoleModule,
		CqrsModule,
		HttpModule,
		CacheModule.register(),
		GraphQLRequestModule.forRootAsync(GraphQLRequestModule, {
			useFactory: (configService: ConfigService) => ({
				endpoint: configService.get<string>('AIP_REMOTE_URL'),
				options: {
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${configService.get<string>('AIP_REMOTE_TOKEN')}`,
					},
				},
			}),
			inject: [ConfigService, Reflector],
		}),
	],
	providers: [
		DuplicateInstallationGroupRemovalService,
		FileWriterService,
		UpdateOVSPassport,
		UndoOVSImportService,
		CorrectCoordinatesService,
		SetOvsSurveySurveyorCli,
		Logger,
		ConfigService,
		ObjectRepository,
		PrismaService,
		SurveyRepository,
		JunctionBoxRepository,
		SupportSystemRepository,
		LuminaireRepository,
		NormalizeOVSImportData,
		ExternalAIPGraphQLRepository,
		SetOVSSurveySurveyorsCommand,
		SetOVSSurveySurveyorsHandler,
		SetOvsSurveySurveyorsService,
		SetOvsSurveySurveyorsRepository,
		Nen2767FindObjectsWithDecompositionQuery,
		Nen2767FindObjectsWithDecompositionHandler,
		Nen2767MigrateDecompositionCommand,
		Nen2767MigrateDecompositionHandler,
		Nen2767MigrateDecompositionService,
		Nen2767MigrateDecompositionRepository,
		Nen2767MigrateDecompositionCli,
		FindObjectsWithMaintenanceMeasuresQuery,
		FindObjectsWithMaintenanceMeasuresHandler,
		MigrateMaintenanceMeasuresCommand,
		MigrateMaintenanceMeasuresHandler,
		MigrateMaintenanceMeasuresService,
		MigrateMaintenanceMeasuresRepository,
		MigrateMaintenanceMeasuresCli,
		CommandResolver,
	],
})
export class CommandModule {}
