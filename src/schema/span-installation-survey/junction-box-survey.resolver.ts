import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { SpanDecompositionItemType } from '../span-installation/types/span-decomposition-item-type';
import { JunctionBox } from '../span-installation/models/junction-box.model';

import { JunctionBoxSurvey } from './models/junction-box-survey.model';
import { JunctionBoxSurveyService } from './junction-box-survey.service';
import { GetJunctionBoxSurveyQuery } from './queries/get-junction-box-survey.query';
import { CreateJunctionBoxSurveyInput } from './dto/create-junction-box-survey.input';
import { CreateJunctionBoxSurveyCommand } from './commands/create-junction-box-survey.command';
import { JunctionBoxSurveyFactory } from './junction-box-survey.factory';
import { UpdateJunctionBoxSurveyCommand } from './commands/update-junction-box-survey.command';
import { UpdateJunctionBoxSurveyInput } from './dto/update-junction-box-survey.input';
import { GetDecompositionItemDamageQuery } from './queries/get-decomposition-item-damage.query';
import { HasDecompositionItemGotDamageQuery } from './queries/has-decomposition-item-got-damage.query';

@Resolver((of) => JunctionBoxSurvey)
@Resource(JunctionBoxSurvey.name)
export class JunctionBoxSurveyResolver {
	constructor(
		private tensionWireSurveyService: JunctionBoxSurveyService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@Query(() => JunctionBoxSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async getJunctionBoxSurvey(@Args('junctionBoxId') junctionBoxId: string) {
		return this.queryBus.execute<GetJunctionBoxSurveyQuery>(new GetJunctionBoxSurveyQuery(junctionBoxId));
	}

	@Mutation(() => JunctionBoxSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async createJunctionBoxSurvey(
		@Args('createJunctionBoxSurvey') input: CreateJunctionBoxSurveyInput,
	): Promise<JunctionBoxSurvey> {
		return JunctionBoxSurveyFactory.CreateJunctionBoxSurvey(
			await this.commandBus.execute<CreateJunctionBoxSurveyCommand>(new CreateJunctionBoxSurveyCommand(input)),
		);
	}

	@Mutation(() => JunctionBoxSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateJunctionBoxSurvey(
		@Args('updateJunctionBoxSurvey') input: UpdateJunctionBoxSurveyInput,
	): Promise<JunctionBoxSurvey> {
		return JunctionBoxSurveyFactory.CreateJunctionBoxSurvey(
			await this.commandBus.execute<UpdateJunctionBoxSurveyCommand>(new UpdateJunctionBoxSurveyCommand(input)),
		);
	}

	@Query(() => JunctionBoxSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async getJunctionBoxDamage(@Args('junctionBoxId') junctionBoxId: string) {
		return this.queryBus.execute<GetDecompositionItemDamageQuery>(
			new GetDecompositionItemDamageQuery(junctionBoxId, SpanDecompositionItemType.spanJunctionBox),
		);
	}

	@ResolveField()
	async hasDamage(@Parent() { id }: JunctionBox): Promise<boolean> {
		return this.queryBus.execute<HasDecompositionItemGotDamageQuery>(
			new HasDecompositionItemGotDamageQuery(id, SpanDecompositionItemType.spanJunctionBox),
		);
	}
}
