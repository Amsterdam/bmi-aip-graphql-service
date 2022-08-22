import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Luminaire } from '../models/luminaire.model';
import { LuminaireService } from '../luminaire.service';

import { FindSupportSystemLuminairesCommand } from './find-support-system-luminaires.command';

@CommandHandler(FindSupportSystemLuminairesCommand)
export class FindSupportSystemLuminairesHandler implements ICommandHandler<FindSupportSystemLuminairesCommand> {
	constructor(private service: LuminaireService) {}

	public async execute({ type }: FindSupportSystemLuminairesCommand): Promise<Luminaire[]> {
		return this.service.getLuminaires(type);
	}
}
