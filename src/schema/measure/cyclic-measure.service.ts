import { Injectable } from '@nestjs/common';

import { CyclicMeasure } from './models/cyclic-measure.model';
import { CyclicMeasureFactory } from './cyclic-measure.factory';
import { CyclicMeasureRepository } from './cyclic-measure.repository';

@Injectable()
export class CyclicMeasureService {
	public constructor(private readonly cyclicMeasureRepo: CyclicMeasureRepository) {}

	async findCyclicMeasures(surveyId: string): Promise<CyclicMeasure[]> {
		return (await this.cyclicMeasureRepo.findCyclicMeasures(surveyId)).map((cyclicMeasure) =>
			CyclicMeasureFactory.CreateCyclicMeasure(cyclicMeasure),
		);
	}

	async deleteCylicMeasuresForUnit(unitId: string): Promise<boolean> {
		const measures = await this.cyclicMeasureRepo.findCyclicMeasuresByUnit(unitId);
		measures.map(async (cyclicMeasure) => {
			await this.cyclicMeasureRepo.deleteCyclicMeasure(cyclicMeasure.id);
		});

		return true;
	}
}
