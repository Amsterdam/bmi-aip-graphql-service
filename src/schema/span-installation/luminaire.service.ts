import { Injectable } from '@nestjs/common';

import { Luminaire } from './models/luminaire.model';
import { LuminaireFactory } from './luminaire.factory';
import { LuminaireRepository } from './luminaire.repository';

@Injectable()
export class LuminaireService {
	public constructor(private readonly luminaireRepo: LuminaireRepository) {}

	async getLuminaires(supportSystemId: string): Promise<Luminaire[]> {
		return (await this.luminaireRepo.getLuminaires(supportSystemId)).map((luminaire) =>
			LuminaireFactory.CreateLuminaire(luminaire),
		);
	}
}
