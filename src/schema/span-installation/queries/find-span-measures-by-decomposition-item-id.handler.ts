import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SpanMeasureService } from '../span-measure.service';
import { SpanMeasure } from '../models/span-measure.model';

import { FindSpanMeasuresByDecompositionItemIdQuery } from './find-span-measures-by-decomposition-item-id.query';

@QueryHandler(FindSpanMeasuresByDecompositionItemIdQuery)
export class FindSpanMeasuresByDecompositionItemIdHandler
	implements IQueryHandler<FindSpanMeasuresByDecompositionItemIdQuery>
{
	constructor(private service: SpanMeasureService) {}

	public async execute({ decompositionItemId }: FindSpanMeasuresByDecompositionItemIdQuery): Promise<SpanMeasure[]> {
		return this.service.findSpanMeasuresByDecompositionItemId(decompositionItemId);
	}
}
