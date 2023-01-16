import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { ReachSegmentService } from '../reach-segment.service';
import { ReachSegment } from '../models/reach-segment.model';

import { FindReachSegmentsQuery } from './find-reach-segments.query';

@QueryHandler(FindReachSegmentsQuery)
export class FindReachSegmentsHandler implements IQueryHandler<FindReachSegmentsQuery> {
	constructor(private service: ReachSegmentService) {}

	async execute(query: FindReachSegmentsQuery): Promise<ReachSegment[]> {
		return this.service.findReachSegments(query.arkSurveyId);
	}
}
