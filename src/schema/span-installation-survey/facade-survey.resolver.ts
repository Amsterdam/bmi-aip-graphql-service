import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { FacadeSurvey } from './models/facade-survey.model';
import { FacadeSurveyService } from './facade-survey.service';
import { GetFacadeSurveyQuery } from './queries/get-facade-survey.query';
import { CreateFacadeSurveyInput } from './dto/create-facade-survey.input';
import { CreateFacadeSurveyCommand } from './commands/create-facade-survey.command';
import { FacadeSurveyFactory } from './facade-survey.factory';
import { UpdateFacadeSurveyCommand } from './commands/update-facade-survey.command';
import { UpdateFacadeSurveyInput } from './dto/update-facade-survey.input';

@Resolver((of) => FacadeSurvey)
@Resource(FacadeSurvey.name)
export class FacadeSurveyResolver {
	constructor(
		private tensionWireSurveyService: FacadeSurveyService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@Query(() => FacadeSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async getFacadeSurvey(@Args('supportSystemId') supportSystemId: string) {
		return this.queryBus.execute<GetFacadeSurveyQuery>(new GetFacadeSurveyQuery(supportSystemId));
	}

	@Mutation(() => FacadeSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async createFacadeSurvey(@Args('createFacadeSurvey') input: CreateFacadeSurveyInput): Promise<FacadeSurvey> {
		return FacadeSurveyFactory.CreateFacadeSurvey(
			await this.commandBus.execute<CreateFacadeSurveyCommand>(new CreateFacadeSurveyCommand(input)),
		);
	}

	@Mutation(() => FacadeSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateFacadeSurvey(@Args('updateFacadeSurvey') input: UpdateFacadeSurveyInput): Promise<FacadeSurvey> {
		return FacadeSurveyFactory.CreateFacadeSurvey(
			await this.commandBus.execute<UpdateFacadeSurveyCommand>(new UpdateFacadeSurveyCommand(input)),
		);
	}
}
