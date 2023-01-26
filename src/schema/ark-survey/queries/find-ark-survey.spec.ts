import { MockedObjectDeep } from 'ts-jest';

import { domainArkSurvey } from '../__stubs__';
import { ArkSurveyService } from '../ark-survey.service';

import { FindArkSurveyQuery } from './find-ark-survey.query';
import { FindArkSurveyHandler } from './find-ark-survey.handler';

const ArkSurveyMock: MockedObjectDeep<ArkSurveyService> = {
	getArkSurveyData: jest.fn().mockResolvedValue([domainArkSurvey]),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('FindArkSurveyHandler', () => {
	test('executes command', async () => {
		const command = new FindArkSurveyQuery(identifier);
		const result = await new FindArkSurveyHandler(ArkSurveyMock).execute(command);

		expect(ArkSurveyMock.getArkSurveyData).toHaveBeenCalledTimes(1);
		expect(ArkSurveyMock.getArkSurveyData).toHaveBeenCalledWith(identifier);

		expect(result).toEqual([domainArkSurvey]);
	});
});
