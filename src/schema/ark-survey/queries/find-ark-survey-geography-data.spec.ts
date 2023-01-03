import { MockedObjectDeep } from 'ts-jest';

import { domainArkSurveyGeographyData } from '../__stubs__';
import { ArkSurveyGeographyDataService } from '../ark-survey-geography-data.service';

import { FindArkSurveyGeographyDataQuery } from './find-ark-survey-geography-data.query';
import { FindArkSurveyGeographyDataHandler } from './find-ark-survey-geography-data.handler';

const ArkSurveyGeographyDataMock: MockedObjectDeep<ArkSurveyGeographyDataService> = {
	getGeographyData: jest.fn().mockResolvedValue([domainArkSurveyGeographyData]),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('FindArkSurveyGeographyDataHandler', () => {
	test('executes command', async () => {
		const command = new FindArkSurveyGeographyDataQuery(identifier);
		const result = await new FindArkSurveyGeographyDataHandler(ArkSurveyGeographyDataMock).execute(command);

		expect(ArkSurveyGeographyDataMock.getGeographyData).toHaveBeenCalledTimes(1);
		expect(ArkSurveyGeographyDataMock.getGeographyData).toHaveBeenCalledWith(identifier);

		expect(result).toEqual([domainArkSurveyGeographyData]);
	});
});
