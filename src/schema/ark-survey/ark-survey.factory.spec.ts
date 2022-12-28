import { SurveyFactory } from '../survey/survey.factory';
import { domainSurvey, arkSurvey } from '../survey/__stubs__';
import { Survey } from '../survey/models/survey.model';
import { InspectionStandard } from '../survey/types';

describe('ArkSurveyFactory', () => {
	test('CreateSurvey() allows setting the inspectionType to quayWalls', () => {
		domainSurvey.inspectionStandardType = InspectionStandard.quaywalls;
		const result = SurveyFactory.CreateSurvey(domainSurvey);

		expect(result).toBeInstanceOf(Survey);
		expect(result).toEqual(expect.objectContaining(arkSurvey));
	});
});
