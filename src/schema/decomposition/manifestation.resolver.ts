import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

import { ManifestationService } from './manifestation.service';
import { CreateManifestationInput } from './dto/create-manifestation.input';
import { Manifestation } from './models/manifestation.model';
import { CreateManifestationCommand } from './commands/create-manifestation.command';
import { ManifestationFactory } from './manifestation.factory';
import { UpdateManifestationInput } from './dto/update-manifestation.input';
import { UpdateManifestationCommand } from './commands/update-manifestation.command';
import { DeleteManifestationCommand } from './commands/delete-manifestation.command';
import { Unit } from './models/unit.model';
import { GetUnitByIdQuery } from './queries/get-unit-by-id.query';

@Resolver(() => Manifestation)
export class ManifestationResolver {
	constructor(
		private manifestationService: ManifestationService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@Mutation(() => Manifestation)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async createManifestation(
		@Args('createManifestation') input: CreateManifestationInput,
	): Promise<Manifestation> {
		return this.commandBus.execute<CreateManifestationCommand>(new CreateManifestationCommand(input));
	}

	@Mutation(() => Manifestation)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateManifestation(
		@Args('updateManifestation') input: UpdateManifestationInput,
	): Promise<Manifestation> {
		return this.commandBus.execute<UpdateManifestationCommand>(new UpdateManifestationCommand(input));
	}

	@Mutation(() => Manifestation)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async deleteManifestation(@Args('identifier') identifier: string): Promise<Manifestation> {
		return ManifestationFactory.CreateManifestation(
			await this.commandBus.execute<DeleteManifestationCommand>(new DeleteManifestationCommand(identifier)),
		);
	}

	@ResolveField()
	unit(@Parent() { unitId }: Manifestation): Promise<Unit> {
		return this.queryBus.execute<GetUnitByIdQuery>(new GetUnitByIdQuery(unitId));
	}
}
