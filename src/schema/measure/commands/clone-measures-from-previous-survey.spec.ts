import { ManifestationRepository } from 'src/schema/decomposition/manifestation.repository';
import { UnitRepository } from 'src/schema/decomposition/unit.repository';
import { SurveyRepository } from 'src/schema/survey/survey.repository';
import { MockedObjectDeep } from 'ts-jest';

import { domainManifestation, domainUnit } from '../../decomposition/__stubs__';
import { MeasureRepository } from '../measure.repository';
import { domainMeasure } from '../__stubs__';

import { CloneMeasuresFromPreviousSurveyCommand } from './clone-measures-from-previous-survey.command';
import { CloneMeasuresFromPreviousSurveyHandler } from './clone-measures-from-previous-survey.handler';

const measureRepositoryMock: MockedObjectDeep<MeasureRepository> = {
	createMeasure: jest.fn().mockResolvedValue(domainMeasure),
	checkIfAlreadyMigrated: jest.fn().mockResolvedValue(false),
	surveyContainsMeasures: jest.fn().mockResolvedValue(false),
	findMeasures: jest.fn().mockResolvedValue([domainMeasure]),
	...(<any>{}),
};

const surveyRepoMock: MockedObjectDeep<SurveyRepository> = {
	findIdPreviousNen2767OrFmecaSurvey: jest.fn().mockResolvedValue('__PREVIOUS_SURVEY_ID__'),
	...(<any>{}),
};

const unitRepositoryMock: MockedObjectDeep<UnitRepository> = {
	getLastCreatedForSurvey: jest.fn().mockResolvedValue(domainUnit),
	getUnitById: jest.fn().mockResolvedValue(domainUnit),
	...(<any>{}),
};

const manifestationRepositoryMock: MockedObjectDeep<ManifestationRepository> = {
	getLastCreatedForSurvey: jest.fn().mockResolvedValue(domainManifestation),
	...(<any>{}),
};

describe('CloneMeasuresFromPreviousSurveyCommand', () => {
	test('executes command (with unit)', async () => {
		const command = new CloneMeasuresFromPreviousSurveyCommand('__SURVEY_ID__');
		await new CloneMeasuresFromPreviousSurveyHandler(
			surveyRepoMock,
			measureRepositoryMock,
			unitRepositoryMock,
			manifestationRepositoryMock,
		).execute(command);

		expect(measureRepositoryMock.surveyContainsMeasures).toHaveBeenCalledTimes(1);
		expect(unitRepositoryMock.getLastCreatedForSurvey).toHaveBeenCalledTimes(1);
		expect(manifestationRepositoryMock.getLastCreatedForSurvey).toHaveBeenCalledTimes(0);
		expect(measureRepositoryMock.findMeasures).toHaveBeenCalledTimes(2);
	});
});
