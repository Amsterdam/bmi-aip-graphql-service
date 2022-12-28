import { MockedObjectDeep } from 'ts-jest';

import { ReachSegmentRepository } from '../ark-reach-segment.repository';
import { domainReachSegment, updateReachSegmentInput } from '../__stubs__';

import { UpdateReachSegmentCommand } from './update-reach-segment.command';
import { UpdateReachSegmentHandler } from './update-reach-segment.handler';

const ReachSegmentRepoMock: MockedObjectDeep<ReachSegmentRepository> = {
	updateReachSegment: jest.fn().mockResolvedValue(domainReachSegment),
	...(<any>{}),
};

describe('UpdateReachSegmentHandler', () => {
	test('executes command', async () => {
		const command = new UpdateReachSegmentCommand(updateReachSegmentInput);
		const result = await new UpdateReachSegmentHandler(ReachSegmentRepoMock).execute(command);

		expect(ReachSegmentRepoMock.updateReachSegment).toHaveBeenCalledTimes(1);

		expect(result).toEqual(domainReachSegment);
	});
});
