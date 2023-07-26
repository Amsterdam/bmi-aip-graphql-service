import { SpanMeasuresSurvey } from '../__stubs__/span-measures-survey-stub';

export const SpanMeasuresSurveyRepository = jest.fn(() => ({
	updateSpanMeasuresSurvey: jest.fn(() => SpanMeasuresSurvey),
	completeSpanMeasuresSurvey: jest.fn(() => SpanMeasuresSurvey),
	getSpanMeasuresSurvey: jest.fn(() => SpanMeasuresSurvey),
}));
