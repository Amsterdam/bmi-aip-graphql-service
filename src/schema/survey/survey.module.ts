import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { PrismaService } from '../../prisma.service';

import { SurveyRepository } from './survey.repository';
import { SurveyService } from './survey.service';
import { SurveyResolver } from './survey.resolver';
import { CreateSurveyCommand } from './commands/create-survey.command';
import { CreateSurveyHandler } from './commands/create-survey.handler';
import { GetSurveyByIdHandler } from './queries/get-survey-by-id.handler';
import { GetSurveysByObjectIdHandler } from './queries/get-surveys-by-object-id.handler';
import { FindSurveyDataByFieldAndIdHandler } from './queries/find-survey-data-by-field-and-id.handler';

@Module({
	providers: [
		SurveyResolver,
		SurveyRepository,
		SurveyService,
		PrismaService,
		CreateSurveyCommand,
		CreateSurveyHandler,
		GetSurveyByIdHandler,
		GetSurveysByObjectIdHandler,
		FindSurveyDataByFieldAndIdHandler,
	],
	exports: [SurveyService],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule, forwardRef(() => SurveyModule)],
})
export class SurveyModule {}
