import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { FindSurveyDataByFieldAndIdQuery } from '../survey/queries/find-survey-data-by-field-and-id.query';

import { SpanMeasuresSurvey } from './models/span-measures-survey.model';
import { GetSpanMeasuresSurveyBySurveyIdQuery } from './queries/get-span-measures-survey-by-survey.query';
import { UpdateSpanMeasuresSurveyInput } from './dto/update-span-measures-survey.input';
import { SpanMeasuresSurveyFactory } from './span-measures-survey.factory';
import { UpdateSpanMeasuresSurveyCommand } from './commands/update-span-measures-survey.command';
import { UpdateSpanMeasuresCompletionCommand } from './commands/update-span-measures-completion.command';

@Resolver((of) => SpanMeasuresSurvey)
@Resource(SpanMeasuresSurvey.name)
export class SpanMeasuresSurveyResolver {
	constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

	@Query(() => SpanMeasuresSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async getSpanMeasuresSurvey(@Args('surveyId') surveyId: string): Promise<SpanMeasuresSurvey> {
		return this.queryBus.execute<GetSpanMeasuresSurveyBySurveyIdQuery>(
			new GetSpanMeasuresSurveyBySurveyIdQuery(surveyId),
		);
	}

	@Mutation(() => SpanMeasuresSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateSpanMeasuresSurvey(
		@Args('updateSpanMeasuresSurvey') input: UpdateSpanMeasuresSurveyInput,
	): Promise<SpanMeasuresSurvey> {
		return SpanMeasuresSurveyFactory.CreateSpanMeasuresSurvey(
			await this.commandBus.execute<UpdateSpanMeasuresSurveyCommand>(new UpdateSpanMeasuresSurveyCommand(input)),
		);
	}

	@Mutation(() => SpanMeasuresSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateSpanMeasuresCompletion(
		@Args('updateSpanMeasuresCompletion') input: UpdateSpanMeasuresSurveyInput,
	): Promise<SpanMeasuresSurvey> {
		return SpanMeasuresSurveyFactory.CreateSpanMeasuresSurvey(
			await this.commandBus.execute<UpdateSpanMeasuresCompletionCommand>(
				new UpdateSpanMeasuresCompletionCommand(input),
			),
		);
	}

	@ResolveField()
	async preparedAuthor(@Parent() { surveyId }: SpanMeasuresSurvey): Promise<string> {
		return this.queryBus.execute<FindSurveyDataByFieldAndIdQuery>(
			new FindSurveyDataByFieldAndIdQuery(surveyId, 'preparedAuthor'),
		);
	}

	@ResolveField()
	async preparedDate(@Parent() { surveyId }: SpanMeasuresSurvey): Promise<Date> {
		return this.queryBus.execute<FindSurveyDataByFieldAndIdQuery>(
			new FindSurveyDataByFieldAndIdQuery(surveyId, 'preparedDate'),
		);
	}

	@ResolveField()
	async verifiedAuthor(@Parent() { surveyId }: SpanMeasuresSurvey): Promise<string> {
		return this.queryBus.execute<FindSurveyDataByFieldAndIdQuery>(
			new FindSurveyDataByFieldAndIdQuery(surveyId, 'verifiedAuthor'),
		);
	}

	@ResolveField()
	async verifiedDate(@Parent() { surveyId }: SpanMeasuresSurvey): Promise<Date> {
		return this.queryBus.execute<FindSurveyDataByFieldAndIdQuery>(
			new FindSurveyDataByFieldAndIdQuery(surveyId, 'verifiedDate'),
		);
	}

	@ResolveField()
	async inspectionStandardData(@Parent() { surveyId }: SpanMeasuresSurvey): Promise<JSON> {
		return this.queryBus.execute<FindSurveyDataByFieldAndIdQuery>(
			new FindSurveyDataByFieldAndIdQuery(surveyId, 'inspectionStandardData'),
		);
	}
}
