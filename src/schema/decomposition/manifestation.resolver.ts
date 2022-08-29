import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

import { Manifestation as DomainManifestation } from './types/manifestation.repository.interface';
import { ManifestationService } from './manifestation.service';
import { CreateManifestationInput } from './dto/create-manifestation.input';
import { Manifestation } from './models/manifestation.model';
import { CreateManifestationCommand } from './commands/create-manifestation.command';
import { ManifestationFactory } from './manifestation.factory';
import { UpdateManifestationInput } from './dto/update-manifestation.input';
import { UpdateManifestationCommand } from './commands/update-manifestation.command';
import { DeleteManifestationCommand } from './commands/delete-manifestation.command';

@Resolver(() => Manifestation)
export class ManifestationResolver {
	constructor(private manifestationService: ManifestationService, private commandBus: CommandBus) {}

	@Mutation(() => Manifestation)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async createManifestation(
		@Args('createManifestation') input: CreateManifestationInput,
	): Promise<Manifestation> {
		const domainManifestation: DomainManifestation = await this.commandBus.execute<CreateManifestationCommand>(
			new CreateManifestationCommand(input),
		);

		return ManifestationFactory.CreateManifestation(domainManifestation);
	}

	@Mutation(() => Manifestation)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async updateManifestation(
		@Args('updateManifestation') input: UpdateManifestationInput,
	): Promise<Manifestation> {
		const domainManifestation: DomainManifestation = await this.commandBus.execute<UpdateManifestationCommand>(
			new UpdateManifestationCommand(input),
		);

		return ManifestationFactory.CreateManifestation(domainManifestation);
	}

	@Mutation(() => Manifestation)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async deleteManifestation(@Args('identifier') identifier: string): Promise<Manifestation> {
		const domainManifestation: DomainManifestation = await this.commandBus.execute<DeleteManifestationCommand>(
			new DeleteManifestationCommand(identifier),
		);
		return ManifestationFactory.CreateManifestation(domainManifestation);
	}
}
