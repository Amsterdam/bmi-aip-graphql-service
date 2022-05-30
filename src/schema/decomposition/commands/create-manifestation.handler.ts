import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ManifestationRepository } from '../manifestation.repository';
import { Manifestation } from '../types/manifestation.repository.interface';

import { CreateManifestationCommand } from './create-manifestation.command';

@CommandHandler(CreateManifestationCommand)
export class CreateManifestationHandler implements ICommandHandler<CreateManifestationCommand> {
	constructor(private repository: ManifestationRepository) {}

	public async execute(command: CreateManifestationCommand): Promise<Manifestation> {
		return this.repository.createManifestation(command.data);
	}
}
