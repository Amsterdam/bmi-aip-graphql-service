import { Args, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { FacadeSurvey } from './models/facade-survey.model';
import { FacadeSurveyFactory } from './facade-survey.factory';
import { FacadeSurveyService } from './facade-survey.service';
import { CreateFacadeSurveyInput } from './dto/create-facade-survey.input';
import { UpdateFacadeSurveyInput } from './dto/update-facade-survey.input';
import { CreateFacadeSurveyCommand } from './commands/create-facade-survey.command';
import { UpdateFacadeSurveyCommand } from './commands/update-facade-survey.command';
import { DeleteFacadeSurveyCommand } from './commands/delete-facade-survey.command';
import { FacadeSurvey as DomainFacadeSurvey } from './types/facade-survey.repository.interface';
import { GetFacadeSurveyBySurveyIdQuery } from './queries/get-facade-survey-by-survey.query';

@Resolver((of) => FacadeSurvey)
@Resource(FacadeSurvey.name)
export class FacadeSurveyResolver {
	constructor(
		// private facadeSurveyService: FacadeSurveyService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@Query(() => FacadeSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async getArkSurvey(@Args('surveyId') surveyId: string): Promise<FacadeSurvey> {
		return this.queryBus.execute<GetFacadeSurveyBySurveyIdQuery>(new GetFacadeSurveyBySurveyIdQuery(surveyId));
	}

	@Mutation(() => FacadeSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async createFacadeSurvey(@Args('createFacadeSurvey') input: CreateFacadeSurveyInput): Promise<FacadeSurvey> {
		const domainFacadeSurvey: DomainFacadeSurvey = await this.commandBus.execute<CreateFacadeSurveyCommand>(
			new CreateFacadeSurveyCommand(input),
		);
		return FacadeSurveyFactory.createFacadeSurvey(domainFacadeSurvey);
	}

	@Mutation(() => FacadeSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateFacadeSurvey(@Args('updateFacadeSurvey') input: UpdateFacadeSurveyInput): Promise<FacadeSurvey> {
		const domainFacadeSurvey: DomainFacadeSurvey = await this.commandBus.execute<UpdateFacadeSurveyCommand>(
			new UpdateFacadeSurveyCommand(input),
		);
		return FacadeSurveyFactory.createFacadeSurvey(domainFacadeSurvey);
	}

	@Mutation(() => FacadeSurvey)
	public async deleteFacadeSurvey(@Args('surveyId') surveyId: string): Promise<FacadeSurvey> {
		const domainFacadeSurvey: DomainFacadeSurvey = await this.commandBus.execute<DeleteFacadeSurveyCommand>(
			new DeleteFacadeSurveyCommand(surveyId),
		);
		return FacadeSurveyFactory.createFacadeSurvey(domainFacadeSurvey);
	}
}
