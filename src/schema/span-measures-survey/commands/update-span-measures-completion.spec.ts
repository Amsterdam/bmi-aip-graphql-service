import { MockedObjectDeep } from 'ts-jest';

import { SpanMeasuresSurvey } from '../models/span-measures-survey.model';
import { SpanMeasuresSurveyRepository } from '../span-measures-survey.repository';
import { updateSpanMeasuresSurveyInput } from '../__stubs__/span-measures-survey-stub';

import { UpdateSpanMeasuresCompletionCommand } from './update-span-measures-completion.command';
import { UpdateSpanMeasuresCompletionHandler } from './update-span-measures-completion.handler';

const SpanMeasuresSurveyRepoMock: MockedObjectDeep<SpanMeasuresSurveyRepository> = {
	updateSpanMeasuresCompletion: jest.fn().mockResolvedValue(SpanMeasuresSurvey),
	...(<any>{}),
};

describe('UpdateSpanMeasuresCompletionHandler', () => {
	test('executes command', async () => {
		const command = new UpdateSpanMeasuresCompletionCommand(updateSpanMeasuresSurveyInput);
		const result = await new UpdateSpanMeasuresCompletionHandler(SpanMeasuresSurveyRepoMock).execute(command);

		expect(SpanMeasuresSurveyRepoMock.updateSpanMeasuresCompletion).toHaveBeenCalledTimes(1);
		expect(SpanMeasuresSurveyRepoMock.updateSpanMeasuresCompletion).toHaveBeenCalledWith(
			updateSpanMeasuresSurveyInput,
		);

		expect(result).toEqual(SpanMeasuresSurvey);
	});
});
