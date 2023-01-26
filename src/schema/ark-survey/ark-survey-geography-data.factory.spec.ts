import { ArkSurveyFactory } from './ark-survey.factory';
import { ArkSurvey } from './models/ark-survey.model';
import { domainArkSurvey } from './__stubs__';

describe('ARK / ArkSurvey Factory', () => {
	test('CreateArkSurvey() constructs an instance of a ArkSurvey GraphQL model', () => {
		const result = ArkSurveyFactory.createArkSurvey(domainArkSurvey);
		const object = {
			...domainArkSurvey,
		};

		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(ArkSurvey);
	});
});
