import { InspectionStandardDataFactory } from './inspection-standard-data.factory';
import { InspectionStandardData } from './models/inspection-standard-data.model';
import {
	FacadeFollowUpSurvey as domainFacadeFollowUpSurvey,
	facadeFollowUpSurveyRaw,
} from './__stubs__/facade-follow-up-survey-stub';

describe('Inspection standard data / Factory', () => {
	test('createInspectionStandardDataFromJSONB() constructs an instance of a InspectionStandardData GraphQL model', () => {
		const result = InspectionStandardDataFactory.createInspectionStandardDataFromJSONB(
			facadeFollowUpSurveyRaw.inspectionStandardData,
		);
		const object = {
			...domainFacadeFollowUpSurvey.inspectionStandardData,
		};

		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(InspectionStandardData);
	});
});
