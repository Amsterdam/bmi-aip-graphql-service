import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LuminaireRepository } from '../luminaire.repository';
import { Luminaire } from '../types/luminaire.repository.interface';

import { DeleteLuminaireCommand } from './delete-luminaire.command';

@CommandHandler(DeleteLuminaireCommand)
export class DeleteLuminaireHandler implements ICommandHandler<DeleteLuminaireCommand> {
	constructor(private repository: LuminaireRepository) {}

	public async execute(command: DeleteLuminaireCommand): Promise<Luminaire> {
		return this.repository.deleteLuminaire(command.identifier);
	}
}
