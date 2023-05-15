import { SpanMeasuresSurvey } from '../__stubs__/span-measures-survey-stub';

export const SpanMeasuresSurveyService = jest.fn(() => ({
	getSpanMeasuresSurvey: jest.fn(() => SpanMeasuresSurvey),
}));
