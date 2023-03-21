import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ManifestationRepository } from '../manifestation.repository';
import { Manifestation } from '../models/manifestation.model';
import { ManifestationFactory } from '../manifestation.factory';

import { UpdateManifestationCommand } from './update-manifestation.command';

@CommandHandler(UpdateManifestationCommand)
export class UpdateManifestationHandler implements ICommandHandler<UpdateManifestationCommand> {
	constructor(private repository: ManifestationRepository) {}

	public async execute(command: UpdateManifestationCommand): Promise<Manifestation> {
		return ManifestationFactory.CreateManifestation(await this.repository.updateManifestation(command.data));
	}
}
