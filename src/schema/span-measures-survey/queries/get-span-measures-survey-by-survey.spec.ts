import { MockedObjectDeep } from 'ts-jest';

import { SpanMeasuresSurveyService } from '../span-measures-survey.service';
import { SpanMeasuresSurvey } from '../__stubs__/span-measures-survey-stub';

import { GetSpanMeasuresSurveyBySurveyIdHandler } from './get-span-measures-survey-by-survey.handler';
import { GetSpanMeasuresSurveyBySurveyIdQuery } from './get-span-measures-survey-by-survey.query';

const SpanMeasuresSurveyServiceMock: MockedObjectDeep<SpanMeasuresSurveyService> = {
	getSpanMeasuresSurvey: jest.fn().mockResolvedValue(SpanMeasuresSurvey),
	...(<any>{}),
};

const identifier = 'b6bbf8gi3e-da23-4693-9502-e6000015c709';

describe('GetSpanMeasuresSurveyBySurveyIdHandler', () => {
	test('executes query', async () => {
		const query = new GetSpanMeasuresSurveyBySurveyIdQuery(identifier);
		const result = await new GetSpanMeasuresSurveyBySurveyIdHandler(SpanMeasuresSurveyServiceMock).execute(query);

		expect(SpanMeasuresSurveyServiceMock.getSpanMeasuresSurvey).toHaveBeenCalledTimes(1);
		expect(SpanMeasuresSurveyServiceMock.getSpanMeasuresSurvey).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(SpanMeasuresSurvey);
	});
});
