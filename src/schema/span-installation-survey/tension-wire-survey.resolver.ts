import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { TensionWireSurvey } from './models/tension-wire-survey.model';
import { TensionWireSurveyService } from './tension-wire-survey.service';
import { GetTensionWireSurveyQuery } from './queries/get-tension-wire-survey.query';
import { CreateTensionWireSurveyInput } from './dto/create-tension-wire-survey.input';
import { CreateTensionWireSurveyCommand } from './commands/create-tension-wire-survey.command';
import { TensionWireSurveyFactory } from './tension-wire-survey.factory';
import { UpdateTensionWireSurveyCommand } from './commands/update-tension-wire-survey.command';
import { UpdateTensionWireSurveyInput } from './dto/update-tension-wire-survey.input';

@Resolver((of) => TensionWireSurvey)
@Resource(TensionWireSurvey.name)
export class TensionWireSurveyResolver {
	constructor(
		private tensionWireSurveyService: TensionWireSurveyService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@Query(() => TensionWireSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async getTensionWireSurvey(
		@Args('surveyId') surveyId: string,
		@Args('supportSystemId') supportSystemId: string,
	) {
		return this.queryBus.execute<GetTensionWireSurveyQuery>(
			new GetTensionWireSurveyQuery(surveyId, supportSystemId),
		);
	}

	@Mutation(() => TensionWireSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async createTensionWireSurvey(
		@Args('createTensionWireSurvey') input: CreateTensionWireSurveyInput,
	): Promise<TensionWireSurvey> {
		return TensionWireSurveyFactory.CreateTensionWireSurvey(
			await this.commandBus.execute<CreateTensionWireSurveyCommand>(new CreateTensionWireSurveyCommand(input)),
		);
	}

	@Mutation(() => TensionWireSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateTensionWireSurvey(
		@Args('updateTensionWireSurvey') input: UpdateTensionWireSurveyInput,
	): Promise<TensionWireSurvey> {
		return TensionWireSurveyFactory.CreateTensionWireSurvey(
			await this.commandBus.execute<UpdateTensionWireSurveyCommand>(new UpdateTensionWireSurveyCommand(input)),
		);
	}
}
