import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { ReachSegment } from '../models/reach-segment.model';
import { ReachSegmentService } from '../reach-segment.service';

import { FindReachSegmentsQuery } from './find-reach-segments.query';

@QueryHandler(FindReachSegmentsQuery)
export class FindReachSegmentsHandler implements IQueryHandler<FindReachSegmentsQuery> {
	constructor(private service: ReachSegmentService) {}

	async execute(query: FindReachSegmentsQuery): Promise<ReachSegment[]> {
		return this.service.findReachSegments(query.arkSurveyId);
	}
}
