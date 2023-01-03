import { MockedObjectDeep } from 'ts-jest';

import { ArkSurveyGeographyDataRepository } from '../ark-survey-geography-data.repository';
import { domainArkSurveyGeographyData, updateArkSurveyGeographyDataInput } from '../__stubs__';

import { UpdateArkSurveyGeographyDataCommand } from './update-ark-survey-geography-data.command';
import { UpdateArkSurveyGeographyDataHandler } from './update-ark-survey-geography-data.handler';

const ArkSurveyGeographyDataRepoMock: MockedObjectDeep<ArkSurveyGeographyDataRepository> = {
	updateArkSurveyGeographyData: jest.fn().mockResolvedValue(domainArkSurveyGeographyData),
	...(<any>{}),
};

describe('UpdateArkSurveyGeographyDataHandler', () => {
	test('executes command', async () => {
		const command = new UpdateArkSurveyGeographyDataCommand(updateArkSurveyGeographyDataInput);
		const result = await new UpdateArkSurveyGeographyDataHandler(ArkSurveyGeographyDataRepoMock).execute(command);

		expect(ArkSurveyGeographyDataRepoMock.updateArkSurveyGeographyData).toHaveBeenCalledTimes(1);

		expect(result).toEqual(domainArkSurveyGeographyData);
	});
});
