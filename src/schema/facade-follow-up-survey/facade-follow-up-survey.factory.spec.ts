import { FacadeFollowUpSurveyFactory } from './facade-follow-up-survey.factory';
import { FacadeFollowUpSurvey } from './models/facade-follow-up-survey.model';
import {
	FacadeFollowUpSurvey as domainFacadeFollowUpSurvey,
	facadeFollowUpSurveyRaw,
} from './__stubs__/facade-follow-up-survey-stub';

describe('Facade / FacadeFollowUpSurvey Factory', () => {
	test('CreateFacadeFollowUpSurvey() constructs an instance of a FacadeFollowUpSurvey GraphQL model', () => {
		const result = FacadeFollowUpSurveyFactory.createFacadeFollowUpSurvey(facadeFollowUpSurveyRaw);
		const object = {
			...domainFacadeFollowUpSurvey,
		};

		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(FacadeFollowUpSurvey);
	});
});
