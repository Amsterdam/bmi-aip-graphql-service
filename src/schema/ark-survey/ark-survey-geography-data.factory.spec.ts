import { ArkSurveyFactory } from './ark-survey.factory';
import { ArkSurvey } from './models/ark-survey.model';
import { domainArkSurvey } from './__stubs__';

describe('ARK / ArkSurvey Factory', () => {
	test('CreateArkSurvey() constructs an instance of a ArkSurvey GraphQL model', () => {
		const result = ArkSurveyFactory.createArkSurvey(domainArkSurvey);
		const object = {
			...domainArkSurvey,
			createdAt: domainArkSurvey.created_at ?? null,
			updatedAt: domainArkSurvey.updated_at ?? null,
			deletedAt: domainArkSurvey.deleted_at ?? null,
		};
		delete object.created_at;
		delete object.updated_at;
		delete object.deleted_at;

		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(ArkSurvey);
	});
});
