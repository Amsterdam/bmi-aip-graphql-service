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
import { MigrateNen2767DecompositionService } from './migrate-nen2767-decomposition.service';
import { MigrateNen2767DecompositionRepository } from './migrate-nen2767-decomposition.repository';
import { MigrateNen2767DecompositionCommand } from './commands/migrate-nen2767-decomposition.command';
import { MigrateNen2767DecompositionHandler } from './commands/migrate-nen2767-decomposition.handler';
import { MigrateNen2767DecompositionCli } from './cli/migrate-nen2767-decomposition.cli';
import { FindObjectsWithNen2767DecompositionQuery } from './queries/find-objects-with-nen2767-decomposition.query';
import { FindObjectsWithNen2767DecompositionHandler } from './queries/find-objects-with-nen2767-decomposition.handler';

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
		FindObjectsWithNen2767DecompositionQuery,
		FindObjectsWithNen2767DecompositionHandler,
		MigrateNen2767DecompositionCommand,
		MigrateNen2767DecompositionHandler,
		MigrateNen2767DecompositionService,
		MigrateNen2767DecompositionRepository,
		MigrateNen2767DecompositionCli,
		CommandResolver,
	],
})
export class CommandModule {}
