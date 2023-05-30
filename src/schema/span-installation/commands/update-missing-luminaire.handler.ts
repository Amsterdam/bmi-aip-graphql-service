import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LuminaireRepository } from '../luminaire.repository';
import { Luminaire } from '../types/luminaire.repository.interface';

import { UpdateMissingLuminaireCommand } from './update-missing-luminaire.command';

@CommandHandler(UpdateMissingLuminaireCommand)
export class UpdateMissingLuminaireHandler implements ICommandHandler<UpdateMissingLuminaireCommand> {
	constructor(private repository: LuminaireRepository) {}

	public async execute(command: UpdateMissingLuminaireCommand): Promise<Luminaire> {
		return this.repository.reviseLuminaire(command.data);
	}
}
