import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Manifestation } from '../models/manifestation.model';
import { ManifestationService } from '../manifestation.service';

import { FindUnitManifestationsCommand } from './find-unit-manifestations.command';

@CommandHandler(FindUnitManifestationsCommand)
export class FindUnitManifestationsHandler implements ICommandHandler<FindUnitManifestationsCommand> {
	constructor(private service: ManifestationService) {}

	public async execute({ unitId }: FindUnitManifestationsCommand): Promise<Manifestation[]> {
		return this.service.getManifestations(unitId);
	}
}
