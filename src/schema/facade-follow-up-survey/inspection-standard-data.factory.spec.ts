import { InspectionStandardDataFactory } from './inspection-standard-data.factory';
import { FacadeInspectionStandardData } from './models/facade-inspection-standard-data.model';
import {
	FacadeFollowUpSurvey as domainFacadeFollowUpSurvey,
	facadeFollowUpSurveyRaw,
} from './__stubs__/facade-follow-up-survey-stub';

describe('Inspection standard data / Factory', () => {
	test('createInspectionStandardDataFromJSONB() constructs an instance of a InspectionStandardData GraphQL model', () => {
		const result = InspectionStandardDataFactory.CreateInspectionStandardDataFromJSONB(
			facadeFollowUpSurveyRaw.inspectionStandardData,
		);
		const object = {
			...domainFacadeFollowUpSurvey.inspectionStandardData,
		};

		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(FacadeInspectionStandardData);
	});
});
