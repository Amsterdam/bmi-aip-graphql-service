import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LuminaireRepository } from '../luminaire.repository';
import { Luminaire } from '../types/luminaire.repository.interface';

import { ReviseLuminaireCommand } from './revise-luminaire.command';

@CommandHandler(ReviseLuminaireCommand)
export class ReviseLuminaireHandler implements ICommandHandler<ReviseLuminaireCommand> {
	constructor(private repository: LuminaireRepository) {}

	public async execute(command: ReviseLuminaireCommand): Promise<Luminaire> {
		return this.repository.reviseLuminaire(command.data);
	}
}
