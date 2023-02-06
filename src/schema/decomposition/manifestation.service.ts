import { Injectable } from '@nestjs/common';

import { ManifestationRepository } from './manifestation.repository';
import { ManifestationFactory } from './manifestation.factory';
import { Manifestation } from './models/manifestation.model';

@Injectable()
export class ManifestationService {
	constructor(private readonly manifestationRepo: ManifestationRepository) {}

	public async getManifestations(unitId: string): Promise<Manifestation[]> {
		return (await this.manifestationRepo.getManifestations(unitId)).map((manifestation) =>
			ManifestationFactory.CreateManifestation(manifestation),
		);
	}

	async getManifestationById(manifestationId: string): Promise<Manifestation> {
		return ManifestationFactory.CreateManifestation(
			await this.manifestationRepo.getManifestationById(manifestationId),
		);
	}
}
