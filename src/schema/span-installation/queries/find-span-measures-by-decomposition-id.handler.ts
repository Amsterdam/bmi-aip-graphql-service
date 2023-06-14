import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SpanMeasureService } from '../span-measure.service';
import { SpanMeasure } from '../models/span-measure.model';

import { FindSpanMeasuresByDecompositionIdQuery } from './find-span-measures-by-decomposition-id.query';

@QueryHandler(FindSpanMeasuresByDecompositionIdQuery)
export class FindSpanMeasuresByDecompositionIdHandler implements IQueryHandler<FindSpanMeasuresByDecompositionIdQuery> {
	constructor(private service: SpanMeasureService) {}

	public async execute({ decompositionId }: FindSpanMeasuresByDecompositionIdQuery): Promise<SpanMeasure[]> {
		return this.service.findSpanMeasuresByDecompositionId(decompositionId);
	}
}
