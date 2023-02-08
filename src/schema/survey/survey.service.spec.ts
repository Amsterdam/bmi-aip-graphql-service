import { MockedObjectDeep } from 'ts-jest';

import { SurveyService } from './survey.service';
import { SurveyRepository } from './survey.repository';
import { domainSurvey } from './__stubs__';
import { SurveyFactory } from './survey.factory';
import { Survey } from './models/survey.model';

jest.mock('./survey.repository');

const surveyRepoMock: MockedObjectDeep<SurveyRepository> = {
	getSurveyById: jest.fn().mockResolvedValue(domainSurvey),
	...(<any>{}),
};

describe('Survey / Service', () => {
	test('getSurvey', async () => {
		const service = new SurveyService(surveyRepoMock);
		const survey = await service.getSurvey('0deb07f3-28f5-47e1-b72a-d1b2a19d4670');
		expect(survey).toBeInstanceOf(Survey);
		expect(survey).toEqual(SurveyFactory.CreateSurvey(domainSurvey));
	});
});
