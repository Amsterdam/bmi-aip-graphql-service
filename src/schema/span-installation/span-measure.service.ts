import { Injectable } from '@nestjs/common';

import { SpanMeasure } from './models/span-measure.model';
import { SpanMeasureFactory } from './span-measure.factory';
import { SpanMeasureRepository } from './span-measure.repository';

@Injectable()
export class SpanMeasureService {
	public constructor(private readonly spanMeasureRepo: SpanMeasureRepository) {}

	async findSpanMeasures(surveyId: string): Promise<SpanMeasure[]> {
		return (await this.spanMeasureRepo.findSpanMeasures(surveyId)).map((spanMeasure) =>
			SpanMeasureFactory.CreateSpanMeasure(spanMeasure),
		);
	}

	async findSpanMeasuresByDecompositionId(decompositionId: string): Promise<SpanMeasure[]> {
		return (await this.spanMeasureRepo.findSpanMeasuresByDecompositionId(decompositionId)).map((spanMeasure) =>
			SpanMeasureFactory.CreateSpanMeasure(spanMeasure),
		);
	}
}
