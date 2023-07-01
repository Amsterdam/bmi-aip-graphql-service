import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { registerEnumType } from '@nestjs/graphql';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { PrismaService } from 'src/prisma.service';

import { SurveyStates } from '../survey/types/surveyStates';

import { UpdateSpanMeasuresCompletionCommand } from './commands/update-span-measures-completion.command';
import { UpdateSpanMeasuresCompletionHandler } from './commands/update-span-measures-completion.handler';
import { UpdateSpanMeasuresSurveyCommand } from './commands/update-span-measures-survey.command';
import { UpdateSpanMeasuresSurveyHandler } from './commands/update-span-measures-survey.handler';
import { GetSpanMeasuresSurveyBySurveyIdHandler } from './queries/get-span-measures-survey-by-survey.handler';
import { GetSpanMeasuresSurveyBySurveyIdQuery } from './queries/get-span-measures-survey-by-survey.query';
import { SpanMeasuresSurveyRepository } from './span-measures-survey.repository';
import { SpanMeasuresSurveyResolver } from './span-measures-survey.resolver';
import { SpanMeasuresSurveyService } from './span-measures-survey.service';

registerEnumType(SurveyStates, {
	name: 'SurveyStates',
});

@Module({
	providers: [
		PrismaService,
		SpanMeasuresSurveyService,
		SpanMeasuresSurveyRepository,
		SpanMeasuresSurveyResolver,
		UpdateSpanMeasuresSurveyCommand,
		UpdateSpanMeasuresSurveyHandler,
		GetSpanMeasuresSurveyBySurveyIdHandler,
		GetSpanMeasuresSurveyBySurveyIdQuery,
		UpdateSpanMeasuresCompletionCommand,
		UpdateSpanMeasuresCompletionHandler,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule],
})
export class SpanMeasuresSurveyModule {}
