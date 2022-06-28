import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ManifestationRepository } from '../manifestation.repository';
import { Manifestation } from '../types/manifestation.repository.interface';

import { DeleteManifestationCommand } from './delete-manifestation.command';

@CommandHandler(DeleteManifestationCommand)
export class DeleteManifestationHandler implements ICommandHandler<DeleteManifestationCommand> {
	constructor(private repository: ManifestationRepository) {}

	public async execute(command: DeleteManifestationCommand): Promise<Manifestation> {
		return this.repository.deleteManifestation(command.identifier);
	}
}
