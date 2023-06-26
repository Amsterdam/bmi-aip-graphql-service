import { Injectable } from '@nestjs/common';

import { Measure } from './models/measure.model';
import { MeasureFactory } from './measure.factory';
import { MeasureRepository } from './measure.repository';

@Injectable()
export class MeasureService {
	public constructor(private readonly measureRepo: MeasureRepository) {}

	async findMeasures(surveyId: string): Promise<Measure[]> {
		return (await this.measureRepo.findMeasures(surveyId)).map((measure) => MeasureFactory.CreateMeasure(measure));
	}

	async findMeasuresByUnitId(unitId: string): Promise<Measure[]> {
		return (await this.measureRepo.findMeasuresByUnit(unitId)).map((measure) =>
			MeasureFactory.CreateMeasure(measure),
		);
	}

	async createMeasure(measure: Measure, surveyId: string): Promise<Measure> {
		const result = await this.measureRepo.createMeasure({
			...measure,
			surveyId,
		});

		return MeasureFactory.CreateMeasure(result);
	}

	async deleteMeasuresForUnit(unitId: string): Promise<boolean> {
		const measures = await this.measureRepo.findMeasuresByUnit(unitId);
		measures.map(async (measure) => {
			await this.measureRepo.deleteMeasure(measure.id);
		});

		return true;
	}
}
