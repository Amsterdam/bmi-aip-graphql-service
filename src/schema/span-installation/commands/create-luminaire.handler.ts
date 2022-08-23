import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LuminaireRepository } from '../luminaire.repository';
import { Luminaire } from '../types/luminaire.repository.interface';

import { CreateLuminaireCommand } from './create-luminaire.command';

@CommandHandler(CreateLuminaireCommand)
export class CreateLuminaireHandler implements ICommandHandler<CreateLuminaireCommand> {
	constructor(private repository: LuminaireRepository) {}

	public async execute(command: CreateLuminaireCommand): Promise<Luminaire> {
		return this.repository.createLuminaire(command.data);
	}
}
