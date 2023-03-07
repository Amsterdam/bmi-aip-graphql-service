import { Injectable } from '@nestjs/common';

import { MeasureService } from '../measure/measure.service';
import { CyclicMeasureService } from '../measure/cyclic-measure.service';

import { UnitRepository } from './unit.repository';
import { UnitFactory } from './unit.factory';
import { Unit } from './models/unit.model';
import { UnitHasManifestationsException } from './exceptions/unit-has-manifestations.exception';

@Injectable()
export class UnitService {
	public constructor(
		private readonly unitRepo: UnitRepository,
		private readonly measuresService: MeasureService,
		private readonly cyclicMeasuresService: CyclicMeasureService,
	) {}

	async getUnits(elementId: string): Promise<Unit[]> {
		return (await this.unitRepo.getUnits(elementId)).map((unit) => UnitFactory.CreateUnit(unit));
	}

	async deleteUnit(unitId: string): Promise<Unit> {
		const hasManifestations = await this.unitRepo.hasManifestations(unitId);

		if (hasManifestations) {
			throw new UnitHasManifestationsException(unitId);
		}

		await this.measuresService.deleteMeasuresForUnit(unitId);
		await this.cyclicMeasuresService.deleteCyclicMeasuresForUnit(unitId);

		return UnitFactory.CreateUnit(await this.unitRepo.deleteUnit(unitId));
	}

	async getUnitById(unitId: string): Promise<Unit> {
		return UnitFactory.CreateUnit(await this.unitRepo.getUnitById(unitId));
	}
}
