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
}
