import { Injectable } from '@nestjs/common';

import { CyclicMeasure } from './models/cyclic-measure.model';
import { CyclicMeasureFactory } from './cyclic-measure.factory';
import { CyclicMeasureRepository } from './cyclic-measure.repository';

@Injectable()
export class CyclicMeasureService {
	public constructor(private readonly cyclicMeasureRepo: CyclicMeasureRepository) {}

	async getCyclicMeasures(unitId: string): Promise<CyclicMeasure[]> {
		return (await this.cyclicMeasureRepo.getCyclicMeasures(unitId)).map((cyclicMeasure) =>
			CyclicMeasureFactory.CreateCyclicMeasure(cyclicMeasure),
		);
	}
}
