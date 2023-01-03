import { MockedObjectDeep } from 'ts-jest';

import { ArkSurveyGeographyDataRepository } from '../ark-survey-geography-data.repository';
import { domainArkSurveyGeographyData } from '../__stubs__';

import { DeleteArkSurveyGeographyDataCommand } from './delete-ark-survey-geography-data.command';
import { DeleteArkSurveyGeographyDataHandler } from './delete-ark-survey-geography-data.handler';

const ArkSurveyGeographyDataRepoMock: MockedObjectDeep<ArkSurveyGeographyDataRepository> = {
	deleteArkSurveyGeographyData: jest.fn().mockResolvedValue(domainArkSurveyGeographyData),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('DeleteArkSurveyGeographyDataHandler', () => {
	test('executes command', async () => {
		const command = new DeleteArkSurveyGeographyDataCommand(identifier);
		const result = await new DeleteArkSurveyGeographyDataHandler(ArkSurveyGeographyDataRepoMock).execute(command);

		expect(ArkSurveyGeographyDataRepoMock.deleteArkSurveyGeographyData).toHaveBeenCalledTimes(1);
		expect(ArkSurveyGeographyDataRepoMock.deleteArkSurveyGeographyData).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(domainArkSurveyGeographyData);
	});
});
