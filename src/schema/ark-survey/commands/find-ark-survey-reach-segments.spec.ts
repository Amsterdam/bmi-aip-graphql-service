import { MockedObjectDeep } from 'ts-jest';

import { ReachSegmentService } from '../reach-segment.service';
import { ReachSegment as reachSegmentStub } from '../__stubs__';

import { FindArkSurveyReachSegmentsHandler } from './find-ark-survey-reach-segments.handler';
import { FindArkSurveyReachSegmentsCommand } from './find-ark-survey-reach-segments.command';

const reachSegmentsServiceMock: MockedObjectDeep<ReachSegmentService> = {
	findReachSegments: jest.fn().mockResolvedValue([reachSegmentStub]),
	...(<any>{}),
};

describe('FindArkSurveyReachSegmentsHandler', () => {
	test('executes command', async () => {
		const command = new FindArkSurveyReachSegmentsCommand('___ARK_SURVEY_ID___');
		const result = await new FindArkSurveyReachSegmentsHandler(reachSegmentsServiceMock).execute(command);

		expect(reachSegmentsServiceMock.findReachSegments).toHaveBeenCalledTimes(1);
		expect(reachSegmentsServiceMock.findReachSegments).toHaveBeenCalledWith('___ARK_SURVEY_ID___');

		expect(result).toEqual([reachSegmentStub]);
	});
});
