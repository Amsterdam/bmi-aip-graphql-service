import { SpanMeasuresSurvey } from './models/span-measures-survey.model';
import { SpanMeasuresSurveyFactory } from './span-measures-survey.factory';
import {
	SpanMeasuresSurvey as ResultSpanMeasuresSurvey,
	domainSpanMeasuresSurvey,
} from './__stubs__/span-measures-survey-stub';

describe('Span measures survey / Factory', () => {
	test('CreateSpanMeasuresSurvey() constructs an instance of a SpanMeasuresSurvey GraphQL model', () => {
		const result = SpanMeasuresSurveyFactory.CreateSpanMeasuresSurvey(domainSpanMeasuresSurvey);
		const object = {
			...ResultSpanMeasuresSurvey,
		};

		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(SpanMeasuresSurvey);
	});
});
