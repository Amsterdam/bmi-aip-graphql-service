import { MockedObjectDeep } from 'ts-jest';

import { ReachSegmentRepository } from '../ark-reach-segment.repository';
import { createReachSegmentInput, domainReachSegment } from '../__stubs__';

import { CreateReachSegmentCommand } from './create-reach-segment.command';
import { CreateReachSegmentHandler } from './create-reach-segment.handler';

const ReachSegmentRepoMock: MockedObjectDeep<ReachSegmentRepository> = {
	createReachSegment: jest.fn().mockResolvedValue(domainReachSegment),
	...(<any>{}),
};

describe('CreateReachSegmentHandler', () => {
	test('executes command', async () => {
		const command = new CreateReachSegmentCommand(createReachSegmentInput);
		const result = await new CreateReachSegmentHandler(ReachSegmentRepoMock).execute(command);

		expect(ReachSegmentRepoMock.createReachSegment).toHaveBeenCalledTimes(1);
		expect(ReachSegmentRepoMock.createReachSegment).toHaveBeenCalledWith(createReachSegmentInput);

		expect(result).toEqual(domainReachSegment);
	});
});
