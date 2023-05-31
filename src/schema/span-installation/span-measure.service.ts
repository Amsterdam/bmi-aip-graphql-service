import { Injectable } from '@nestjs/common';

import { SpanMeasure } from './models/span-measure.model';
import { SpanMeasureFactory } from './span-measure.factory';
import { SpanMeasureRepository } from './span-measure.repository';
import { SpanMeasureItem } from './models/span-measure-item.model';
import { SpanMeasureItemService } from './span-measure-item.service';

@Injectable()
export class SpanMeasureService {
	public constructor(
		private readonly spanMeasureRepo: SpanMeasureRepository,
		private readonly spanMeasureItemService: SpanMeasureItemService,
	) {}

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

	setStatusForItemsInMeasure(spanMeasureItems: SpanMeasureItem[]): SpanMeasureItem[] {
		spanMeasureItems.map(async (item: SpanMeasureItem) => {
			item.status = this.spanMeasureItemService.determineSpanMeasureItemStatus(item);
		});

		return spanMeasureItems;
	}
}
