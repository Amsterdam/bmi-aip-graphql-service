import { Injectable } from '@nestjs/common';

import { UnitRepository } from './unit.repository';
import { UnitFactory } from './unit.factory';
import { Unit } from './models/unit.model';
import { UnitHasManifestationsException } from './exceptions/unit-has-manifestations.exception';

@Injectable()
export class UnitService {
	constructor(private readonly unitRepo: UnitRepository) {}

	public async getUnits(elementId: string): Promise<Unit[]> {
		return (await this.unitRepo.getUnits(elementId)).map((unit) => UnitFactory.CreateUnit(unit));
	}

	public async deleteUnit(unitId: string): Promise<Unit> {
		const hasManifestations = await this.unitRepo.hasManifestations(unitId);
		if (hasManifestations) {
			throw new UnitHasManifestationsException(unitId);
		}

		return UnitFactory.CreateUnit(await this.unitRepo.deleteUnit(unitId));
	}
}
