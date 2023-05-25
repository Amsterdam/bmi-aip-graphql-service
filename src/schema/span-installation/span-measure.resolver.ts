import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { SpanMeasureService } from './span-measure.service';
import { SpanMeasure } from './models/span-measure.model';
import { FindSpanMeasuresQuery } from './queries/find-span-measures.query';
import { CreateSpanMeasureInput } from './dto/create-span-measure.input';
import { SpanMeasureFactory } from './span-measure.factory';
import { CreateSpanMeasureCommand } from './commands/create-span-measure.command';
import { UpdateSpanMeasureInput } from './dto/update-span-measure-input';
import { UpdateSpanMeasureCommand } from './commands/update-span-measure.command';
import { SpanMeasure as DomainSpanMeasure } from './types/span-measure.repository.interface';
import { DeleteSpanMeasureCommand } from './commands/delete-span-measure.command';
import { FindSpanMeasureItemsQuery } from './queries/find-span-measure-items.query';
import { SpanMeasureItem } from './models/span-measure-item.model';
import { SaveSpanMeasureItemsInput } from './dto/save-span-measure-items-input';
import { SaveSpanMeasureItemsCommand } from './commands/save-span-measure-items.command';
import { UpdateSpanMeasureItemsActualsInput } from './dto/update-span-measure-items-actuals-input';
import { UpdateSpanMeasureItemsActualsCommand } from './commands/update-span-measure-items-actuals.command';
import { FindActiveSpanMeasureItemsQuery } from './queries/find-active-span-measure-items.query';

@Resolver((of) => SpanMeasure)
@Resource(SpanMeasure.name)
export class SpanMeasureResolver {
	constructor(
		private spanMeasureService: SpanMeasureService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@Query(() => [SpanMeasure])
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async spanMeasures(@Args('surveyId') surveyId: string): Promise<SpanMeasure[]> {
		return this.queryBus.execute<FindSpanMeasuresQuery>(new FindSpanMeasuresQuery(surveyId));
	}

	@Mutation(() => SpanMeasure)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async createSpanMeasure(@Args('createSpanMeasure') input: CreateSpanMeasureInput): Promise<SpanMeasure> {
		return this.commandBus.execute<CreateSpanMeasureCommand>(new CreateSpanMeasureCommand(input));
	}

	@Mutation(() => SpanMeasure)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async updateSpanMeasure(@Args('updateSpanMeasure') input: UpdateSpanMeasureInput): Promise<SpanMeasure> {
		return this.commandBus.execute<UpdateSpanMeasureCommand>(new UpdateSpanMeasureCommand(input));
	}

	@Mutation(() => SpanMeasure)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async deleteSpanMeasure(@Args('identifier') identifier: string): Promise<SpanMeasure> {
		return this.commandBus.execute<DeleteSpanMeasureCommand>(new DeleteSpanMeasureCommand(identifier));
	}

	@Mutation(() => [SpanMeasureItem])
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async saveSpanMeasureItems(
		@Args('saveSpanMeasureItems') input: SaveSpanMeasureItemsInput,
	): Promise<SpanMeasureItem[]> {
		await this.commandBus.execute<SaveSpanMeasureItemsCommand>(new SaveSpanMeasureItemsCommand(input));
		return this.queryBus.execute<FindSpanMeasureItemsQuery>(new FindSpanMeasureItemsQuery(input.spanMeasureId));
	}

	@Mutation(() => [SpanMeasureItem])
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateSpanMeasureItemsActuals(
		@Args('updateSpanMeasureItemsActuals') input: UpdateSpanMeasureItemsActualsInput,
	): Promise<SpanMeasureItem[]> {
		await this.commandBus.execute<UpdateSpanMeasureItemsActualsCommand>(
			new UpdateSpanMeasureItemsActualsCommand(input),
		);
		return this.queryBus.execute<FindSpanMeasureItemsQuery>(new FindSpanMeasureItemsQuery(input.spanMeasureId));
	}

	@ResolveField()
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	async measureItems(@Parent() { id }: SpanMeasure, @Context() context): Promise<SpanMeasureItem[]> {
		const { user } = context.req;

		// Owner should see all items, surveyor only active items
		// if	(user.realm_access.roles.includes('aip_owner')) {
		//	return this.queryBus.execute<FindSpanMeasureItemsQuery>(new FindSpanMeasureItemsQuery(id));
		//}

		return this.queryBus.execute<FindSpanMeasureItemsQuery>(new FindSpanMeasureItemsQuery(id));
	}
}
