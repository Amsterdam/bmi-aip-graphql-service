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
}