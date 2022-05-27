import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';

import { Manifestation as DomainManifestation } from './types/manifestation.repository.interface';
import { ManifestationService } from './manifestation.service';
import { CreateManifestationInput } from './dto/create-manifestation.input';
import { Manifestation } from './models/manifestation.model';
import { CreateManifestationCommand } from './commands/create-manifestation.command';
import { ManifestationFactory } from './manifestation.factory';

@Resolver(() => Manifestation)
export class ManifestationResolver {
	constructor(private manifestationService: ManifestationService, private commandBus: CommandBus) {}

	@Mutation(() => Manifestation)
	public async createManifestation(
		@Args('createManifestation') input: CreateManifestationInput,
	): Promise<Manifestation> {
		const domainManifestation: DomainManifestation = await this.commandBus.execute<CreateManifestationCommand>(
			new CreateManifestationCommand(input),
		);

		return ManifestationFactory.CreateManifestation(domainManifestation);
	}
}
