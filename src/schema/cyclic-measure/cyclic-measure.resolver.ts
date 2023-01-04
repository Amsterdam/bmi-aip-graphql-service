import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus } from '@nestjs/cqrs';

import { CyclicMeasure } from './models/cyclic-measure.model';
import { CyclicMeasureFactory } from './cyclic-measure.factory';
import { CyclicMeasureService } from './cyclic-measure.service';
import { CreateCyclicMeasureInput } from './dto/create-cyclic-measure.input';
import { UpdateCyclicMeasureInput } from './dto/update-cyclic-measure.input';
import { CreateCyclicMeasureCommand } from './commands/create-cyclic-measure.command';
import { UpdateCyclicMeasureCommand } from './commands/update-cyclic-measure.command';
import { CyclicMeasure as DomainCyclicMeasure } from './types/cyclic-measure.repository.interface';
import { DeleteCyclicMeasureCommand } from './commands/delete-cyclic-measure.command';

@Resolver((of) => CyclicMeasure)
@Resource(CyclicMeasure.name)
export class CyclicMeasureResolver {
	constructor(private cyclicMeasureService: CyclicMeasureService, private commandBus: CommandBus) {}

	@Mutation(() => CyclicMeasure)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async createCyclicMeasure(
		@Args('createCyclicMeasure') input: CreateCyclicMeasureInput,
	): Promise<CyclicMeasure> {
		const domainCyclicMeasure: DomainCyclicMeasure = await this.commandBus.execute<CreateCyclicMeasureCommand>(
			new CreateCyclicMeasureCommand(input),
		);
		return CyclicMeasureFactory.CreateCyclicMeasure(domainCyclicMeasure);
	}

	@Mutation(() => CyclicMeasure)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async updateCyclicMeasure(
		@Args('updateCyclicMeasure') input: UpdateCyclicMeasureInput,
	): Promise<CyclicMeasure> {
		const domainCyclicMeasure: DomainCyclicMeasure = await this.commandBus.execute<UpdateCyclicMeasureCommand>(
			new UpdateCyclicMeasureCommand(input),
		);
		return CyclicMeasureFactory.CreateCyclicMeasure(domainCyclicMeasure);
	}

	@Mutation(() => CyclicMeasure)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async deleteCyclicMeasure(@Args('identifier') identifier: string): Promise<CyclicMeasure> {
		const domainCyclicMeasure: DomainCyclicMeasure = await this.commandBus.execute<DeleteCyclicMeasureCommand>(
			new DeleteCyclicMeasureCommand(identifier),
		);
		return CyclicMeasureFactory.CreateCyclicMeasure(domainCyclicMeasure);
	}

	@Query((returns) => [CyclicMeasure], { name: 'cyclicMeasures' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	async getSurveyCyclicMeasures(@Args('surveyId', { type: () => String }) surveyId: string) {
		return this.cyclicMeasureService.getCyclicMeasures(surveyId);
	}
}
