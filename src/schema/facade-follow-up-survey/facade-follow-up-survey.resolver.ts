import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { Survey } from '../survey/models/survey.model';
import { FindInspectionStandardDataByIdQuery } from '../survey/queries/find-inspection-standard-data-by-id.query';

import { FacadeFollowUpSurvey } from './models/facade-follow-up-survey.model';
import { FacadeFollowUpSurveyFactory } from './facade-follow-up-survey.factory';
import { FacadeFollowUpSurveyService } from './facade-follow-up-survey.service';
import { SaveFacadeFollowUpSurveyInput } from './dto/save-facade-follow-up-survey.input';
import { SaveFacadeFollowUpSurveyCommand } from './commands/save-facade-follow-up-survey.command';
import { DeleteFacadeFollowUpSurveyCommand } from './commands/delete-facade-follow-up-survey.command';
import { FacadeFollowUpSurvey as DomainFacadeFollowUpSurvey } from './types/facade-follow-up-survey.repository.interface';
import { GetFacadeFollowUpSurveyBySurveyIdQuery } from './queries/get-facade-follow-up-survey-by-survey.query';

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
	public async saveFacadeFollowUpSurvey(
		@Args('saveFacadeFollowUpSurvey') input: SaveFacadeFollowUpSurveyInput,
	): Promise<FacadeFollowUpSurvey> {
		const domainFacadeFollowUpSurvey: DomainFacadeFollowUpSurvey =
			await this.commandBus.execute<SaveFacadeFollowUpSurveyCommand>(new SaveFacadeFollowUpSurveyCommand(input));
		return FacadeFollowUpSurveyFactory.createFacadeFollowUpSurvey(domainFacadeFollowUpSurvey);
	}

	@Mutation(() => FacadeFollowUpSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async deleteFacadeFollowUpSurvey(@Args('surveyId') surveyId: string): Promise<FacadeFollowUpSurvey> {
		const domainFacadeFollowUpSurvey: DomainFacadeFollowUpSurvey =
			await this.commandBus.execute<DeleteFacadeFollowUpSurveyCommand>(
				new DeleteFacadeFollowUpSurveyCommand(surveyId),
			);
		return FacadeFollowUpSurveyFactory.createFacadeFollowUpSurvey(domainFacadeFollowUpSurvey);
	}

	@ResolveField()
	async remarks(@Parent() { surveyId }: FacadeFollowUpSurvey): Promise<JSON> {
		return this.queryBus.execute<FindInspectionStandardDataByIdQuery>(
			new FindInspectionStandardDataByIdQuery(surveyId),
		);
	}
}
