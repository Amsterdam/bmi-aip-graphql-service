import { MockedObjectDeep } from 'ts-jest';

import { ReachSegmentRepository } from '../ark-reach-segment.repository';
import { domainReachSegment } from '../__stubs__';

import { DeleteReachSegmentCommand } from './delete-reach-segment.command';
import { DeleteReachSegmentHandler } from './delete-reach-segment.handler';

const ReachSegmentRepoMock: MockedObjectDeep<ReachSegmentRepository> = {
	deleteReachSegment: jest.fn().mockResolvedValue(domainReachSegment),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('DeleteReachSegmentHandler', () => {
	test('executes command', async () => {
		const command = new DeleteReachSegmentCommand(identifier);
		const result = await new DeleteReachSegmentHandler(ReachSegmentRepoMock).execute(command);

		expect(ReachSegmentRepoMock.deleteReachSegment).toHaveBeenCalledTimes(1);
		expect(ReachSegmentRepoMock.deleteReachSegment).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(domainReachSegment);
	});
});
