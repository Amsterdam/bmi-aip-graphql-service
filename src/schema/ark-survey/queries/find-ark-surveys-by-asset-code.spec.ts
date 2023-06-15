import { MockedObjectDeep } from 'ts-jest';

import { domainArkSurvey, domainArkSurveysByAssetCode } from '../__stubs__';
import { ArkSurveyService } from '../ark-survey.service';

import { FindArkSurveysByAssetCodeHandler } from './find-ark-surveys-by-asset-code.handler';
import { FindArkSurveysByAssetCodeQuery } from './find-ark-surveys-by-asset-code.query';

const ArkSurveyMock: MockedObjectDeep<ArkSurveyService> = {
	getArkSurvey: jest.fn().mockResolvedValue([domainArkSurvey]),
	findArkSurveysByAssetCode: jest.fn().mockResolvedValue([domainArkSurveysByAssetCode]),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('FindArkSurveysByAssetCodeHandler', () => {
	test('executes query', async () => {
		const command = new FindArkSurveysByAssetCodeQuery(identifier);
		const result = await new FindArkSurveysByAssetCodeHandler(ArkSurveyMock).execute(command);

		expect(ArkSurveyMock.findArkSurveysByAssetCode).toHaveBeenCalledTimes(1);
		expect(ArkSurveyMock.findArkSurveysByAssetCode).toHaveBeenCalledWith(identifier);

		expect(result).toEqual([domainArkSurveysByAssetCode]);
	});
});
