import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { SpanMeasureRepository } from '../span-measure.repository';
import { SpanMeasureStatus } from '../types/span-measure-status';

import { DetermineSpanMeasureStatusQuery } from './determine-span-measure-status.query';

@QueryHandler(DetermineSpanMeasureStatusQuery)
export class DetermineSpanMeasureStatusHandler implements IQueryHandler<DetermineSpanMeasureStatusQuery> {
	constructor(private repository: SpanMeasureRepository) {}

	async execute(query: DetermineSpanMeasureStatusQuery): Promise<SpanMeasureStatus> {
		return this.repository.determineSpanMeasureStatus(query.spanMeasureId);
	}
}
