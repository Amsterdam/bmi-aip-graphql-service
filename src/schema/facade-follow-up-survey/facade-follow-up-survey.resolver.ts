import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { FindInspectionStandardDataByIdQuery } from '../survey/queries/find-inspection-standard-data-by-id.query';
import { FindPreparedAuthorByIdQuery } from '../survey/queries/find-prepared-author-by-id.query';
import { FindPreparedDateByIdQuery } from '../survey/queries/find-prepared-date-by-id.query';
import { FindVerifiedAuthorByIdQuery } from '../survey/queries/find-verified-author-by-id.query';
import { FindVerifiedDateByIdQuery } from '../survey/queries/find-verified-date-by-id.query';

import { GetFacadeFollowUpSurveyBySurveyIdQuery } from './queries/get-facade-follow-up-survey-by-survey.query';
import { FacadeFollowUpSurvey } from './models/facade-follow-up-survey.model';
import { FacadeFollowUpSurveyFactory } from './facade-follow-up-survey.factory';
import { UpdateFacadeFollowUpSurveyInput } from './dto/update-facade-follow-up-survey.input';
import { UpdateFacadeFollowUpSurveyCommand } from './commands/update-facade-follow-up-survey.command';
// import { DeleteFacadeFollowUpSurveyCommand } from './commands/delete-facade-follow-up-survey.command';
import { FacadeFollowUpSurvey as DomainFacadeFollowUpSurvey } from './types/facade-follow-up-survey.repository.interface';

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
		const domainFacadeFollowUpSurvey: DomainFacadeFollowUpSurvey =
			await this.commandBus.execute<UpdateFacadeFollowUpSurveyCommand>(
				new UpdateFacadeFollowUpSurveyCommand(input),
			);
		return FacadeFollowUpSurveyFactory.createFacadeFollowUpSurvey(domainFacadeFollowUpSurvey);
	}

	@ResolveField()
	async inspectionStandardData(@Parent() { id }: FacadeFollowUpSurvey): Promise<JSON> {
		return this.queryBus.execute<FindInspectionStandardDataByIdQuery>(new FindInspectionStandardDataByIdQuery(id));
	}

	@ResolveField()
	async preparedAuthor(@Parent() { id }: FacadeFollowUpSurvey): Promise<string> {
		return this.queryBus.execute<FindPreparedAuthorByIdQuery>(new FindPreparedAuthorByIdQuery(id));
	}

	@ResolveField()
	async preparedDate(@Parent() { id }: FacadeFollowUpSurvey): Promise<Date> {
		return this.queryBus.execute<FindPreparedDateByIdQuery>(new FindPreparedDateByIdQuery(id));
	}

	@ResolveField()
	async verifiedAuthor(@Parent() { id }: FacadeFollowUpSurvey): Promise<string> {
		return this.queryBus.execute<FindVerifiedAuthorByIdQuery>(new FindVerifiedAuthorByIdQuery(id));
	}

	@ResolveField()
	async verifiedDate(@Parent() { id }: FacadeFollowUpSurvey): Promise<Date> {
		return this.queryBus.execute<FindVerifiedDateByIdQuery>(new FindVerifiedDateByIdQuery(id));
	}
}
