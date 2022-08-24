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

@Module({
	providers: [
		SurveyResolver,
		SurveyRepository,
		SurveyService,
		PrismaService,
		CreateSurveyCommand,
		CreateSurveyHandler,
	],
	exports: [SurveyService],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule, forwardRef(() => SurveyModule)],
})
export class SurveyModule {}
