import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LuminaireRepository } from '../luminaire.repository';
import { Luminaire } from '../types/luminaire.repository.interface';

import { UpdateLuminaireCommand } from './update-luminaire.command';

@CommandHandler(UpdateLuminaireCommand)
export class UpdateLuminaireHandler implements ICommandHandler<UpdateLuminaireCommand> {
	constructor(private repository: LuminaireRepository) {}

	public async execute(command: UpdateLuminaireCommand): Promise<Luminaire> {
		return this.repository.updateLuminaire(command.data);
	}
}
