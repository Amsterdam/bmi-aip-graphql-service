import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

import { Unit as DomainUnit } from './types/unit.repository.interface';
import { UnitService } from './unit.service';
import { CreateUnitInput } from './dto/create-unit.input';
import { Unit } from './models/unit.model';
import { CreateUnitCommand } from './commands/create-unit.command';
import { UnitFactory } from './unit.factory';
import { UpdateUnitInput } from './dto/update-unit.input';
import { UpdateUnitCommand } from './commands/update-unit.command';
import { DeleteUnitCommand } from './commands/delete-unit.command';
import { Manifestation } from './models/manifestation.model';
import { FindUnitManifestationsCommand } from './commands/find-unit-manifestations.command';
import { GetElementByIdQuery } from './queries/get-element-by-id.query';
import { Element } from './models/element.model';

@Resolver(() => Unit)
export class UnitResolver {
	constructor(private unitService: UnitService, private commandBus: CommandBus, private queryBus: QueryBus) {}

	@Mutation(() => Unit)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async createUnit(@Args('createUnit') input: CreateUnitInput): Promise<Unit> {
		return this.commandBus.execute<CreateUnitCommand>(new CreateUnitCommand(input));
	}

	@Mutation(() => Unit)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateUnit(@Args('updateUnit') input: UpdateUnitInput): Promise<Unit> {
		return this.commandBus.execute<UpdateUnitCommand>(new UpdateUnitCommand(input));
	}

	@Mutation(() => Unit)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async deleteUnit(@Args('identifier') identifier: string): Promise<Unit> {
		return this.commandBus.execute<DeleteUnitCommand>(new DeleteUnitCommand(identifier));
	}

	@ResolveField()
	async manifestations(@Parent() { id }: Unit): Promise<Manifestation[]> {
		return this.commandBus.execute<FindUnitManifestationsCommand>(new FindUnitManifestationsCommand(id));
	}

	@ResolveField()
	element(@Parent() { elementId }: Unit): Promise<Element> {
		return this.queryBus.execute<GetElementByIdQuery>(new GetElementByIdQuery(elementId));
	}
}
