import { InspectionStandardDataFactory } from './inspection-standard-data.factory';
import { SpanMeasuresInspectionStandardData } from './models/span-measures-inspection-standard-data.model';
import {
	SpanMeasuresSurvey as domainSpanMeasuresSurvey,
	spanMeasuresSurveyRaw,
} from './__stubs__/span-measures-survey-stub';

describe('Inspection standard data / Factory', () => {
	test('createInspectionStandardDataFromJSONB() constructs an instance of a InspectionStandardData GraphQL model', () => {
		const result = InspectionStandardDataFactory.CreateInspectionStandardDataFromJSONB(
			spanMeasuresSurveyRaw.inspectionStandardData,
		);
		const object = {
			...domainSpanMeasuresSurvey.inspectionStandardData,
		};

		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(SpanMeasuresInspectionStandardData);
	});
});
