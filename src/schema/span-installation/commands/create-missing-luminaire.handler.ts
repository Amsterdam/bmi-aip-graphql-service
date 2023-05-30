import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LuminaireRepository } from '../luminaire.repository';
import { Luminaire } from '../types/luminaire.repository.interface';

import { CreateMissingLuminaireCommand } from './create-missing-luminaire.command';

@CommandHandler(CreateMissingLuminaireCommand)
export class CreateMissingLuminaireHandler implements ICommandHandler<CreateMissingLuminaireCommand> {
	constructor(private repository: LuminaireRepository) {}

	public async execute(command: CreateMissingLuminaireCommand): Promise<Luminaire> {
		return this.repository.createMissingLuminaire(command.data);
	}
}
