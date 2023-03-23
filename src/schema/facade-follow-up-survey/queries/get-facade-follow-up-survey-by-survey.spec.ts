import { MockedObjectDeep } from 'ts-jest';

import { FacadeFollowUpSurveyService } from '../facade-follow-up-survey.service';
import { FacadeFollowUpSurvey } from '../__stubs__/facade-follow-up-survey-stub';

import { GetFacadeFollowUpSurveyBySurveyIdQuery } from './get-facade-follow-up-survey-by-survey.query';
import { GetFacadeFollowUpSurveyBySurveyIdHandler } from './get-facade-follow-up-survey-by-survey.handler';

const FacadeFollowUpSurveyServiceMock: MockedObjectDeep<FacadeFollowUpSurveyService> = {
	getFacadeFollowUpSurvey: jest.fn().mockResolvedValue(FacadeFollowUpSurvey),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('GetFacadeFollowUpSurveyBySurveyIdHandler', () => {
	test('executes query', async () => {
		const query = new GetFacadeFollowUpSurveyBySurveyIdQuery(identifier);
		const result = await new GetFacadeFollowUpSurveyBySurveyIdHandler(FacadeFollowUpSurveyServiceMock).execute(
			query,
		);

		expect(FacadeFollowUpSurveyServiceMock.getFacadeFollowUpSurvey).toHaveBeenCalledTimes(1);
		expect(FacadeFollowUpSurveyServiceMock.getFacadeFollowUpSurvey).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(FacadeFollowUpSurvey);
	});
});
