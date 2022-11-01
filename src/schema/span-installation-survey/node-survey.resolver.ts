import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { NodeSurvey } from './models/node-survey.model';
import { NodeSurveyService } from './node-survey.service';
import { GetNodeSurveyQuery } from './queries/get-node-survey.query';
import { CreateNodeSurveyInput } from './dto/create-node-survey.input';
import { CreateNodeSurveyCommand } from './commands/create-node-survey.command';
import { NodeSurveyFactory } from './node-survey.factory';
import { UpdateNodeSurveyCommand } from './commands/update-node-survey.command';
import { UpdateNodeSurveyInput } from './dto/update-node-survey.input';

@Resolver((of) => NodeSurvey)
@Resource(NodeSurvey.name)
export class NodeSurveyResolver {
	constructor(
		private tensionWireSurveyService: NodeSurveyService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@Query(() => NodeSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async getNodeSurvey(@Args('supportSystemId') supportSystemId: string) {
		return this.queryBus.execute<GetNodeSurveyQuery>(new GetNodeSurveyQuery(supportSystemId));
	}

	@Mutation(() => NodeSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async createNodeSurvey(@Args('createNodeSurvey') input: CreateNodeSurveyInput): Promise<NodeSurvey> {
		return NodeSurveyFactory.CreateNodeSurvey(
			await this.commandBus.execute<CreateNodeSurveyCommand>(new CreateNodeSurveyCommand(input)),
		);
	}

	@Mutation(() => NodeSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateNodeSurvey(@Args('updateNodeSurvey') input: UpdateNodeSurveyInput): Promise<NodeSurvey> {
		return NodeSurveyFactory.CreateNodeSurvey(
			await this.commandBus.execute<UpdateNodeSurveyCommand>(new UpdateNodeSurveyCommand(input)),
		);
	}
}
