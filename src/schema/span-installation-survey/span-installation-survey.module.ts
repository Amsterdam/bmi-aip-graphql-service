import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';
import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';

import { TensionWireSurveyResolver } from './tension-wire-survey.resolver';
import { TensionWireSurveyService } from './tension-wire-survey.service';
import { TensionWireSurveyRepository } from './tension-wire-survey.repository';
import { GetTensionWireSurveyHandler } from './queries/get-tension-wire-survey.handler';
import { GetTensionWireSurveyQuery } from './queries/get-tension-wire-survey.query';
import { CreateTensionWireSurveyCommand } from './commands/create-tension-wire-survey.command';
import { CreateTensionWireSurveyHandler } from './commands/create-tension-wire-survey.handler';
import { UpdateTensionWireSurveyCommand } from './commands/update-tension-wire-survey.command';
import { UpdateTensionWireSurveyHandler } from './commands/update-tension-wire-survey.handler';
import { MastSurveyResolver } from './mast-survey.resolver';
import { MastSurveyService } from './mast-survey.service';
import { MastSurveyRepository } from './mast-survey.repository';
import { GetMastSurveyHandler } from './queries/get-mast-survey.handler';
import { GetMastSurveyQuery } from './queries/get-mast-survey.query';
import { CreateMastSurveyCommand } from './commands/create-mast-survey.command';
import { CreateMastSurveyHandler } from './commands/create-mast-survey.handler';
import { UpdateMastSurveyCommand } from './commands/update-mast-survey.command';
import { UpdateMastSurveyHandler } from './commands/update-mast-survey.handler';

@Module({
	providers: [
		TensionWireSurveyResolver,
		MastSurveyResolver,
		TensionWireSurveyService,
		MastSurveyService,
		TensionWireSurveyRepository,
		MastSurveyRepository,
		GetTensionWireSurveyHandler,
		GetMastSurveyHandler,
		GetTensionWireSurveyQuery,
		GetMastSurveyQuery,
		CreateTensionWireSurveyCommand,
		CreateMastSurveyCommand,
		CreateTensionWireSurveyHandler,
		CreateMastSurveyHandler,
		UpdateTensionWireSurveyCommand,
		UpdateMastSurveyCommand,
		UpdateTensionWireSurveyHandler,
		UpdateMastSurveyHandler,
		PrismaService,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule],
})
export class SpanInstallationSurveyModule {}
