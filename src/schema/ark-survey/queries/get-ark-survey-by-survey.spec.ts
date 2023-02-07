import { MockedObjectDeep } from 'ts-jest';

import { domainArkSurvey } from '../__stubs__';
import { ArkSurveyService } from '../ark-survey.service';

import { GetArkSurveyBySurveyIdQuery } from './get-ark-survey-by-survey.query';
import { GetArkSurveyBySurveyIdHandler } from './get-ark-survey-by-survey.handler';

const ArkSurveyMock: MockedObjectDeep<ArkSurveyService> = {
	getArkSurvey: jest.fn().mockResolvedValue([domainArkSurvey]),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('GetArkSurveyBySurveyIdHandler', () => {
	test('executes query', async () => {
		const command = new GetArkSurveyBySurveyIdQuery(identifier);
		const result = await new GetArkSurveyBySurveyIdHandler(ArkSurveyMock).execute(command);

		expect(ArkSurveyMock.getArkSurvey).toHaveBeenCalledTimes(1);
		expect(ArkSurveyMock.getArkSurvey).toHaveBeenCalledWith(identifier);

		expect(result).toEqual([domainArkSurvey]);
	});
});
