import { Injectable } from '@nestjs/common';

import { UnitRepository } from './unit.repository';
import { UnitFactory } from './unit.factory';
import { Unit } from './models/unit.model';
import { UnitHasManifestationsException } from './exceptions/unit-has-manifestations.exception';

@Injectable()
export class UnitService {
	public constructor(private readonly unitRepo: UnitRepository) {}

	async getUnits(elementId: string): Promise<Unit[]> {
		return (await this.unitRepo.getUnits(elementId)).map((unit) => UnitFactory.CreateUnit(unit));
	}

	async deleteUnit(unitId: string): Promise<Unit> {
		const hasManifestations = await this.unitRepo.hasManifestations(unitId);
		if (hasManifestations) {
			throw new UnitHasManifestationsException(unitId);
		}

		return UnitFactory.CreateUnit(await this.unitRepo.deleteUnit(unitId));
	}

	async getUnitsBySurveyId(surveyId: string): Promise<Unit[]> {
		return (await this.unitRepo.getUnitsBySurveyId(surveyId)).map((unit) => UnitFactory.CreateUnit(unit));
	}
}
