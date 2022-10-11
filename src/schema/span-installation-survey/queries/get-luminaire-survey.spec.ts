import { MockedObjectDeep } from 'ts-jest';

import { LuminaireSurveyService } from '../luminaire-survey.service';
import { luminaireSurvey } from '../__stubs__';

import { GetLuminaireSurveyQuery } from './get-luminaire-survey.query';
import { GetLuminaireSurveyHandler } from './get-luminaire-survey.handler';

const luminaireSurveyServiceMock: MockedObjectDeep<LuminaireSurveyService> = {
	getLuminaireSurvey: jest.fn().mockResolvedValue(luminaireSurvey),
	...(<any>{}),
};

const luminaireId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('GetLuminaireSurveyHandler', () => {
	test('executes query', async () => {
		const command = new GetLuminaireSurveyQuery(luminaireId);
		const result = await new GetLuminaireSurveyHandler(luminaireSurveyServiceMock).execute(command);

		expect(luminaireSurveyServiceMock.getLuminaireSurvey).toHaveBeenCalledTimes(1);
		expect(luminaireSurveyServiceMock.getLuminaireSurvey).toHaveBeenCalledWith(luminaireId);

		expect(result).toEqual(luminaireSurvey);
	});
});
