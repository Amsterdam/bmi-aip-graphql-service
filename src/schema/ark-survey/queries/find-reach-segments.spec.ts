import { MockedObjectDeep } from 'ts-jest';

import { domainReachSegment } from '../__stubs__';
import { ReachSegmentService } from '../ark-reach-segment.service';

import { FindReachSegmentsQuery } from './find-reach-segments.query';
import { FindReachSegmentsHandler } from './find-reach-segments.handler';

const ReachSegmentMock: MockedObjectDeep<ReachSegmentService> = {
	getReachSegments: jest.fn().mockResolvedValue([domainReachSegment]),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('FindReachSegmentsHandler', () => {
	test('executes command', async () => {
		const command = new FindReachSegmentsQuery(identifier);
		const result = await new FindReachSegmentsHandler(ReachSegmentMock).execute(command);

		expect(ReachSegmentMock.getReachSegments).toHaveBeenCalledTimes(1);
		expect(ReachSegmentMock.getReachSegments).toHaveBeenCalledWith(identifier);

		expect(result).toEqual([domainReachSegment]);
	});
});
