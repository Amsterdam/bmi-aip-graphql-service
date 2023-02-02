import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Manifestation } from '../models/manifestation.model';
import { ManifestationService } from '../manifestation.service';

import { GetManifestationByIdQuery } from './get-manifestation-by-id.query';

@QueryHandler(GetManifestationByIdQuery)
export class GetManifestationByIdHandler implements IQueryHandler<GetManifestationByIdQuery> {
	constructor(private service: ManifestationService) {}

	public async execute(command: GetManifestationByIdQuery): Promise<Manifestation | null> {
		return command.manifestationId ? this.service.getManifestationById(command.manifestationId) : null;
	}
}
