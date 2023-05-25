import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LuminaireRepository } from '../luminaire.repository';
import { Luminaire } from '../types/luminaire.repository.interface';

import { CreateReviseLuminaireCommand } from './create-revise-luminaire.command';

@CommandHandler(CreateReviseLuminaireCommand)
export class CreateReviseLuminaireHandler implements ICommandHandler<CreateReviseLuminaireCommand> {
	constructor(private repository: LuminaireRepository) {}

	public async execute(command: CreateReviseLuminaireCommand): Promise<Luminaire> {
		return this.repository.createReviseLuminaire(command.data);
	}
}
