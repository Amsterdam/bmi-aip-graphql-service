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
import { FindInspectionStandardDataByIdHandler } from './queries/find-inspection-standard-data-by-id.handler';
import { FindVerifiedDateByIdHandler } from './queries/find-verified-date-by-id.handler';
import { FindVerifiedAuthorByIdHandler } from './queries/find-verified-author-by-id.handler';
import { FindPreparedDateByIdHandler } from './queries/find-prepared-date-by-id.handler';
import { FindPreparedAuthorByIdHandler } from './queries/find-prepared-author-by-id.handler';

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
		FindInspectionStandardDataByIdHandler,
		FindPreparedAuthorByIdHandler,
		FindPreparedDateByIdHandler,
		FindVerifiedAuthorByIdHandler,
		FindVerifiedDateByIdHandler,
	],
	exports: [SurveyService],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule, forwardRef(() => SurveyModule)],
})
export class SurveyModule {}
