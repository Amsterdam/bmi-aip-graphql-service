import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { PrismaService } from 'src/prisma.service';

import { FacadeFollowUpSurveyRepository } from './facade-follow-up-survey.repository';
import { FacadeFollowUpSurveyResolver } from './facade-follow-up-survey.resolver';
import { FacadeFollowUpSurveyService } from './facade-follow-up-survey.service';
import { UpdateFacadeFollowUpSurveyHandler } from './commands/update-facade-follow-up-survey.handler';
import { GetFacadeFollowUpSurveyBySurveyIdHandler } from './queries/get-facade-follow-up-survey-by-survey.handler';

@Module({
	providers: [
		FacadeFollowUpSurveyService,
		FacadeFollowUpSurveyRepository,
		FacadeFollowUpSurveyResolver,
		UpdateFacadeFollowUpSurveyHandler,
		GetFacadeFollowUpSurveyBySurveyIdHandler,
		PrismaService,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule],
})
export class FacadeFollowUpSurveyModule {}
