import { MockedObjectDeep } from 'ts-jest';

import { SpanMeasuresSurvey } from '../models/span-measures-survey.model';
import { SpanMeasuresSurveyRepository } from '../span-measures-survey.repository';
import { updateSpanMeasuresSurveyInput } from '../__stubs__/span-measures-survey-stub';

import { UpdateSpanMeasuresSurveyCommand } from './update-span-measures-survey.command';
import { UpdateSpanMeasuresSurveyHandler } from './update-span-measures-survey.handler';

const SpanMeasuresSurveyRepoMock: MockedObjectDeep<SpanMeasuresSurveyRepository> = {
	updateSpanMeasuresSurvey: jest.fn().mockResolvedValue(SpanMeasuresSurvey),
	...(<any>{}),
};

describe('UpdateSpanMeasuresSurveyHandler', () => {
	test('executes command', async () => {
		const command = new UpdateSpanMeasuresSurveyCommand(updateSpanMeasuresSurveyInput);
		const result = await new UpdateSpanMeasuresSurveyHandler(SpanMeasuresSurveyRepoMock).execute(command);

		expect(SpanMeasuresSurveyRepoMock.updateSpanMeasuresSurvey).toHaveBeenCalledTimes(1);
		expect(SpanMeasuresSurveyRepoMock.updateSpanMeasuresSurvey).toHaveBeenCalledWith(updateSpanMeasuresSurveyInput);

		expect(result).toEqual(SpanMeasuresSurvey);
	});
});
