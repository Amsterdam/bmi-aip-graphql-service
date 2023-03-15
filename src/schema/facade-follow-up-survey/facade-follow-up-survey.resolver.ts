import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { GetFacadeFollowUpSurveyBySurveyIdQuery } from './queries/get-facade-follow-up-survey-by-survey.query';
import { FacadeFollowUpSurvey } from './models/facade-follow-up-survey.model';
import { FacadeFollowUpSurveyFactory } from './facade-follow-up-survey.factory';
import { UpdateFacadeFollowUpSurveyInput } from './dto/update-facade-follow-up-survey.input';
import { UpdateFacadeFollowUpSurveyCommand } from './commands/update-facade-follow-up-survey.command';

@Resolver((of) => FacadeFollowUpSurvey)
@Resource(FacadeFollowUpSurvey.name)
export class FacadeFollowUpSurveyResolver {
	constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

	@Query(() => FacadeFollowUpSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async getFacadeFollowUpSurvey(@Args('surveyId') surveyId: string): Promise<FacadeFollowUpSurvey> {
		return this.queryBus.execute<GetFacadeFollowUpSurveyBySurveyIdQuery>(
			new GetFacadeFollowUpSurveyBySurveyIdQuery(surveyId),
		);
	}

	@Mutation(() => FacadeFollowUpSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateFacadeFollowUpSurvey(
		@Args('updateFacadeFollowUpSurvey') input: UpdateFacadeFollowUpSurveyInput,
	): Promise<FacadeFollowUpSurvey> {
		return FacadeFollowUpSurveyFactory.createFacadeFollowUpSurvey(
			await this.commandBus.execute<UpdateFacadeFollowUpSurveyCommand>(
				new UpdateFacadeFollowUpSurveyCommand(input),
			),
		);
	}
}
