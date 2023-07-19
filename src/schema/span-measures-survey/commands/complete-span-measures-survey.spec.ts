import { MockedObjectDeep } from 'ts-jest';

import { SpanMeasuresSurvey } from '../models/span-measures-survey.model';
import { SpanMeasuresSurveyRepository } from '../span-measures-survey.repository';
import { updateSpanMeasuresSurveyInput } from '../__stubs__/span-measures-survey-stub';

import { CompleteSpanMeasuresSurveyCommand } from './complete-span-measures-survey.command';
import { CompleteSpanMeasuresSurveyHandler } from './complete-span-measures-survey.handler';

const SpanMeasuresSurveyRepoMock: MockedObjectDeep<SpanMeasuresSurveyRepository> = {
	completeSpanMeasuresSurvey: jest.fn().mockResolvedValue(SpanMeasuresSurvey),
	...(<any>{}),
};

describe('CompleteSpanMeasuresSurveyHandler', () => {
	test('executes command', async () => {
		const command = new CompleteSpanMeasuresSurveyCommand(updateSpanMeasuresSurveyInput);
		const result = await new CompleteSpanMeasuresSurveyHandler(SpanMeasuresSurveyRepoMock).execute(command);

		expect(SpanMeasuresSurveyRepoMock.completeSpanMeasuresSurvey).toHaveBeenCalledTimes(1);
		expect(SpanMeasuresSurveyRepoMock.completeSpanMeasuresSurvey).toHaveBeenCalledWith(
			updateSpanMeasuresSurveyInput,
		);

		expect(result).toEqual(SpanMeasuresSurvey);
	});
});
