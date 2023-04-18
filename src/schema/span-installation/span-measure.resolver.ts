import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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

@Resolver((of) => SpanMeasure)
@Resource(SpanMeasure.name)
export class SpanMeasureResolver {
	constructor(
		private spanMeasureService: SpanMeasureService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@Query(() => [SpanMeasure])
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async spanMeasures(@Args('surveyId') surveyId: string): Promise<SpanMeasure[]> {
		return this.queryBus.execute<FindSpanMeasuresQuery>(new FindSpanMeasuresQuery(surveyId));
	}

	@Mutation(() => SpanMeasure)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async createSpanMeasure(@Args('createSpanMeasure') input: CreateSpanMeasureInput): Promise<SpanMeasure> {
		const domainSpanMeasure: DomainSpanMeasure = await this.commandBus.execute<CreateSpanMeasureCommand>(
			new CreateSpanMeasureCommand(input),
		);
		return SpanMeasureFactory.CreateSpanMeasure(domainSpanMeasure);
	}

	@Mutation(() => SpanMeasure)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateSpanMeasure(@Args('updateSpanMeasure') input: UpdateSpanMeasureInput): Promise<SpanMeasure> {
		const domainSpanMeasure: DomainSpanMeasure = await this.commandBus.execute<UpdateSpanMeasureCommand>(
			new UpdateSpanMeasureCommand(input),
		);
		return SpanMeasureFactory.CreateSpanMeasure(domainSpanMeasure);
	}

	@Mutation(() => SpanMeasure)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async deleteSpanMeasure(@Args('identifier') identifier: string): Promise<SpanMeasure> {
		const domainSpanMeasure: DomainSpanMeasure = await this.commandBus.execute<DeleteSpanMeasureCommand>(
			new DeleteSpanMeasureCommand(identifier),
		);
		return SpanMeasureFactory.CreateSpanMeasure(domainSpanMeasure);
	}
}
