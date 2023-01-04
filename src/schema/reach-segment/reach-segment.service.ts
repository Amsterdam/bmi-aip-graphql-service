import { Injectable } from '@nestjs/common';

import { ReachSegment } from './models/reach-segment.model';
import { ReachSegmentFactory } from './reach-segment.factory';
import { ReachSegmentRepository } from './reach-segment.repository';

@Injectable()
export class ReachSegmentService {
	public constructor(private readonly reachSegmentRepo: ReachSegmentRepository) {}

	async findReachSegments(surveyId: string): Promise<ReachSegment[]> {
		return (await this.reachSegmentRepo.findReachSegments(surveyId)).map((reachSegment) =>
			ReachSegmentFactory.CreateReachSegment(reachSegment),
		);
	}
}
