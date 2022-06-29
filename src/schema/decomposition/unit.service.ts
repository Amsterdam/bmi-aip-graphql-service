import { Injectable } from '@nestjs/common';

import { UnitRepository } from './unit.repository';
import { UnitFactory } from './unit.factory';
import { Unit } from './models/unit.model';

@Injectable()
export class UnitService {
	constructor(private readonly unitRepo: UnitRepository) {}

	public async getUnits(elementId: string): Promise<Unit[]> {
		return (await this.unitRepo.getUnits(elementId)).map((unit) => UnitFactory.CreateUnit(unit));
	}
}
