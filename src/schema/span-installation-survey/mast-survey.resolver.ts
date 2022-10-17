import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { MastSurvey } from './models/mast-survey.model';
import { MastSurveyService } from './mast-survey.service';
import { GetMastSurveyQuery } from './queries/get-mast-survey.query';
import { CreateMastSurveyInput } from './dto/create-mast-survey.input';
import { CreateMastSurveyCommand } from './commands/create-mast-survey.command';
import { MastSurveyFactory } from './mast-survey.factory';
import { UpdateMastSurveyCommand } from './commands/update-mast-survey.command';
import { UpdateMastSurveyInput } from './dto/update-mast-survey.input';

@Resolver((of) => MastSurvey)
@Resource(MastSurvey.name)
export class MastSurveyResolver {
	constructor(
		private tensionWireSurveyService: MastSurveyService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@Query(() => MastSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async getMastSurvey(@Args('supportSystemId') supportSystemId: string) {
		return this.queryBus.execute<GetMastSurveyQuery>(new GetMastSurveyQuery(supportSystemId));
	}

	@Mutation(() => MastSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async createMastSurvey(@Args('createMastSurvey') input: CreateMastSurveyInput): Promise<MastSurvey> {
		return MastSurveyFactory.CreateMastSurvey(
			await this.commandBus.execute<CreateMastSurveyCommand>(new CreateMastSurveyCommand(input)),
		);
	}

	@Mutation(() => MastSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateMastSurvey(@Args('updateMastSurvey') input: UpdateMastSurveyInput): Promise<MastSurvey> {
		return MastSurveyFactory.CreateMastSurvey(
			await this.commandBus.execute<UpdateMastSurveyCommand>(new UpdateMastSurveyCommand(input)),
		);
	}
}
