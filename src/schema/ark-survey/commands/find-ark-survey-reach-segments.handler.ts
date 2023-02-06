import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ReachSegment } from '../models/reach-segment.model';
import { ReachSegmentService } from '../reach-segment.service';

import { FindArkSurveyReachSegmentsCommand } from './find-ark-survey-reach-segments.command';
@CommandHandler(FindArkSurveyReachSegmentsCommand)
export class FindArkSurveyReachSegmentsHandler implements ICommandHandler<FindArkSurveyReachSegmentsCommand> {
	constructor(private service: ReachSegmentService) {}

	public async execute({ arkSurveyId }: FindArkSurveyReachSegmentsCommand): Promise<ReachSegment[]> {
		return this.service.findReachSegments(arkSurveyId);
	}
}
