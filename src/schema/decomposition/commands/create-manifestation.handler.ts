import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ManifestationRepository } from '../manifestation.repository';
import { ManifestationFactory } from '../manifestation.factory';
import { Manifestation } from '../models/manifestation.model';

import { CreateManifestationCommand } from './create-manifestation.command';

@CommandHandler(CreateManifestationCommand)
export class CreateManifestationHandler implements ICommandHandler<CreateManifestationCommand> {
	constructor(private repository: ManifestationRepository) {}

	public async execute(command: CreateManifestationCommand): Promise<Manifestation> {
		return ManifestationFactory.CreateManifestation(await this.repository.createManifestation(command.data));
	}
}
