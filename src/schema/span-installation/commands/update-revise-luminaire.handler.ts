import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LuminaireRepository } from '../luminaire.repository';
import { Luminaire } from '../types/luminaire.repository.interface';

import { UpdateReviseLuminaireCommand } from './update-revise-luminaire.command';

@CommandHandler(UpdateReviseLuminaireCommand)
export class UpdateReviseLuminaireHandler implements ICommandHandler<UpdateReviseLuminaireCommand> {
	constructor(private repository: LuminaireRepository) {}

	public async execute(command: UpdateReviseLuminaireCommand): Promise<Luminaire> {
		return this.repository.updateReviseLuminaire(command.data);
	}
}
