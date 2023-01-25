import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ReachSegment } from '../models/reach-segment.model';
import { ReachSegmentService } from '../reach-segment.service';

import { FindArkSurveyReachSegmentsQuery } from './find-ark-survey-reach-segments.query';
@QueryHandler(FindArkSurveyReachSegmentsQuery)
export class FindArkSurveyReachSegmentsHandler implements IQueryHandler<FindArkSurveyReachSegmentsQuery> {
	constructor(private service: ReachSegmentService) {}

	async execute(query: FindArkSurveyReachSegmentsQuery): Promise<ReachSegment[]> {
		return this.service.findReachSegments(query.arkSurveyId);
	}
}
