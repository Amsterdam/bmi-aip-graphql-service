import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { registerEnumType } from '@nestjs/graphql';

import { SurveyStates } from '../survey/types/surveyStates';
import { PrismaService } from '../../prisma.service';
import { AuthorizationModule } from '../../authorization/authorization.module';
import { AuthenticationModule } from '../../authentication/authentication.module';

import { CompleteSpanMeasuresSurveyCommand } from './commands/complete-span-measures-survey.command';
import { CompleteSpanMeasuresSurveyHandler } from './commands/complete-span-measures-survey.handler';
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
		CompleteSpanMeasuresSurveyCommand,
		CompleteSpanMeasuresSurveyHandler,
	],
	imports: [CqrsModule, AuthorizationModule, AuthenticationModule],
})
export class SpanMeasuresSurveyModule {}
