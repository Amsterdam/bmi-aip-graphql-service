import { MockedObjectDeep } from 'ts-jest';

import { survey } from '../__stubs__';
import { SurveyService } from '../survey.service';

import { GetSurveyByIdQuery } from './get-survey-by-id.query';
import { GetSurveyByIdHandler } from './get-survey-by-id.handler';

const serviceMock: MockedObjectDeep<SurveyService> = {
	getSurvey: jest.fn().mockResolvedValue(survey),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('GetSurveyByIdQuery', () => {
	test('executes query', async () => {
		const query = new GetSurveyByIdQuery(identifier);
		const result = await new GetSurveyByIdHandler(serviceMock).execute(query);

		expect(serviceMock.getSurvey).toHaveBeenCalledTimes(1);
		expect(serviceMock.getSurvey).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(survey);
	});
});
