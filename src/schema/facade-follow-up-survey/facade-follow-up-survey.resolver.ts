import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { Survey } from '../survey/models/survey.model';
import { FindInspectionStandardDataByIdCommand } from '../survey/commands/find-inspection-standard-data-by-id.command';

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
	constructor(
		// private facadeFollowUpSurveyService: FacadeFollowUpSurveyService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@Query(() => FacadeFollowUpSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async getFacadeFollowUpSurvey(@Args('surveyId') surveyId: string): Promise<FacadeFollowUpSurvey> {
		return this.queryBus.execute<GetFacadeFollowUpSurveyBySurveyIdQuery>(
			new GetFacadeFollowUpSurveyBySurveyIdQuery(surveyId),
		);
	}

	@Mutation(() => FacadeFollowUpSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async createFacadeFollowUpSurvey(
		@Args('createFacadeFollowUpSurvey') input: CreateFacadeFollowUpSurveyInput,
	): Promise<FacadeFollowUpSurvey> {
		const domainFacadeFollowUpSurvey: DomainFacadeFollowUpSurvey =
			await this.commandBus.execute<CreateFacadeFollowUpSurveyCommand>(
				new CreateFacadeFollowUpSurveyCommand(input),
			);
		return FacadeFollowUpSurveyFactory.createFacadeFollowUpSurvey(domainFacadeFollowUpSurvey);
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

	@Mutation(() => FacadeFollowUpSurvey)
	public async deleteFacadeFollowUpSurvey(@Args('surveyId') surveyId: string): Promise<FacadeFollowUpSurvey> {
		const domainFacadeFollowUpSurvey: DomainFacadeFollowUpSurvey =
			await this.commandBus.execute<DeleteFacadeFollowUpSurveyCommand>(
				new DeleteFacadeFollowUpSurveyCommand(surveyId),
			);
		return FacadeFollowUpSurveyFactory.createFacadeFollowUpSurvey(domainFacadeFollowUpSurvey);
	}

	@ResolveField()
	async remarks(@Parent() { id }: Survey): Promise<JSON> {
		return this.queryBus.execute<FindInspectionStandardDataByIdCommand>(
			new FindInspectionStandardDataByIdCommand(id),
		);
	}
}
