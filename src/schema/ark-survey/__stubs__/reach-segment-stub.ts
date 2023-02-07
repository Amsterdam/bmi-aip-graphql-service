import { Decimal } from '@prisma/client/runtime';

import { domainSurvey } from '../../survey/__stubs__';
import { ReachSegment as DomainReachSegment } from '../types/reach-segment.repository.interface';
import { CreateReachSegmentInput } from '../dto/create-reach-segment.input';
import { UpdateReachSegmentInput } from '../dto/update-reach-segment.input';
import { ReachSegmentFactory } from '../reach-segment.factory';

domainSurvey.inspectionStandardType = 'quaywalls';

const reachSegmentRaw: Omit<DomainReachSegment, 'id'> = {
	name: '__NAME__',
	reachSegmentLength: new Decimal(1.23),
	arkSurveyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
	riskScore: 1,
	riskScoreDigit: new Decimal(1.23),
	failureModeScore: new Decimal(1.23),
	consequenceScore: new Decimal(1.23),
	sortNumber: 1,
	created_at: null,
	updated_at: null,
};

export const createReachSegmentInput = Object.keys(reachSegmentRaw).reduce((input, key) => {
	input[key] = reachSegmentRaw[key];
	return input;
}, new CreateReachSegmentInput());

const updateReachSegment = new UpdateReachSegmentInput();
updateReachSegment.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
export const updateReachSegmentInput = Object.keys(reachSegmentRaw).reduce((input, key) => {
	input[key] = reachSegmentRaw[key];
	return input;
}, updateReachSegment);

export const domainReachSegment: DomainReachSegment = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	...reachSegmentRaw,
};

export const ReachSegment = ReachSegmentFactory.CreateReachSegment(domainReachSegment);

export const deletedReachSegment: DomainReachSegment = {
	...domainReachSegment,
};