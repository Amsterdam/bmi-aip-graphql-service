import { MockedObjectDeep } from 'ts-jest';

import { ArkSurveyGeographyDataRepository } from '../ark-survey-geography-data.repository';
import { createArkSurveyGeographyDataInput, domainArkSurveyGeographyData } from '../__stubs__';

import { CreateArkSurveyGeographyDataCommand } from './create-ark-survey-geography-data.command';
import { CreateArkSurveyGeographyDataHandler } from './create-ark-survey-geography-data.handler';

const ArkSurveyGeographyDataRepoMock: MockedObjectDeep<ArkSurveyGeographyDataRepository> = {
	createArkSurveyGeographyData: jest.fn().mockResolvedValue(domainArkSurveyGeographyData),
	...(<any>{}),
};

describe('CreateArkSurveyGeographyDataHandler', () => {
	test('executes command', async () => {
		const command = new CreateArkSurveyGeographyDataCommand(createArkSurveyGeographyDataInput);
		const result = await new CreateArkSurveyGeographyDataHandler(ArkSurveyGeographyDataRepoMock).execute(command);

		expect(ArkSurveyGeographyDataRepoMock.createArkSurveyGeographyData).toHaveBeenCalledTimes(1);
		expect(ArkSurveyGeographyDataRepoMock.createArkSurveyGeographyData).toHaveBeenCalledWith(
			createArkSurveyGeographyDataInput,
		);

		expect(result).toEqual(domainArkSurveyGeographyData);
	});
});
