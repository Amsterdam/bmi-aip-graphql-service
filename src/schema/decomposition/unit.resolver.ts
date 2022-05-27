import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';

import { Unit as DomainUnit } from './types/unit.repository.interface';
import { UnitService } from './unit.service';
import { CreateUnitInput } from './dto/create-unit.input';
import { Unit } from './models/unit.model';
import { CreateUnitCommand } from './commands/create-unit.command';
import { UnitFactory } from './unit.factory';

@Resolver(() => Unit)
export class UnitResolver {
	constructor(private unitService: UnitService, private commandBus: CommandBus) {}

	@Mutation(() => Unit)
	public async createUnit(@Args('createUnit') input: CreateUnitInput): Promise<Unit> {
		const domainUnit: DomainUnit = await this.commandBus.execute<CreateUnitCommand>(new CreateUnitCommand(input));
		return UnitFactory.CreateUnit(domainUnit);
	}
}