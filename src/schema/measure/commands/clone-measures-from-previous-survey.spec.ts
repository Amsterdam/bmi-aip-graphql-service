import { MockedObjectDeep } from 'ts-jest';

import { SurveyAlreadyHasMeasuresException } from '../../survey/exceptions/survey-already-has-measures.exception';
import { domainManifestation, domainUnit } from '../../decomposition/__stubs__';
import { CyclicMeasureRepository } from '../cyclic-measure.repository';
import { CyclicMeasureService } from '../cyclic-measure.service';
import { MeasureRepository } from '../measure.repository';
import { MeasureService } from '../measure.service';
import { domainCyclicMeasure, domainMeasure } from '../__stubs__';
import { DecompositionCloneNotFoundException } from '../../decomposition/exceptions/decomposition-clone-not-found.exception';
import { SurveyRepository } from '../../survey/survey.repository';
import { UnitRepository } from '../../decomposition/unit.repository';
import { ManifestationRepository } from '../../decomposition/manifestation.repository';

import { CloneMeasuresFromPreviousSurveyCommand } from './clone-measures-from-previous-survey.command';
import { CloneMeasuresFromPreviousSurveyHandler } from './clone-measures-from-previous-survey.handler';

const measureRepositoryMock: MockedObjectDeep<MeasureRepository> = {
	createMeasure: jest.fn().mockResolvedValue(domainMeasure),
	checkIfAlreadyMigrated: jest.fn().mockResolvedValue(false),
	surveyContainsMeasures: jest.fn().mockResolvedValue(false),
	findMeasures: jest.fn().mockResolvedValue([domainMeasure]),
	...(<any>{}),
};
const cyclicMeasureRepositoryMock: MockedObjectDeep<CyclicMeasureRepository> = {
	createCyclicMeasure: jest.fn().mockResolvedValue(domainCyclicMeasure),
	checkIfAlreadyMigrated: jest.fn().mockResolvedValue(false),
	surveyContainsMeasures: jest.fn().mockResolvedValue(false),
	findMeasures: jest.fn().mockResolvedValue([domainCyclicMeasure]),
	findCyclicMeasures: jest.fn().mockResolvedValue([domainCyclicMeasure]),
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
const emptyUnitRepositoryMock: MockedObjectDeep<UnitRepository> = {
	getLastCreatedForSurvey: jest.fn().mockResolvedValue(null),
	getUnitById: jest.fn().mockResolvedValue(domainUnit),
	...(<any>{}),
};

const emptyManifestationRepositoryMock: MockedObjectDeep<ManifestationRepository> = {
	getLastCreatedForSurvey: jest.fn().mockResolvedValue(null),
	getManifestationById: jest.fn().mockResolvedValue(domainManifestation),
	...(<any>{}),
};

const measureServiceMock: MockedObjectDeep<MeasureService> = {
	findMeasures: jest.fn().mockResolvedValue([domainMeasure]),
	createMeasure: jest.fn().mockResolvedValue([domainMeasure]),
	...(<any>{}),
};

const cyclicMeasureServiceMock: MockedObjectDeep<CyclicMeasureService> = {
	createCyclicMeasure: jest.fn().mockResolvedValue([domainCyclicMeasure]),
	findCyclicMeasures: jest.fn().mockResolvedValue([domainCyclicMeasure]),
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
			measureServiceMock,
			cyclicMeasureServiceMock,
			cyclicMeasureRepositoryMock,
		).execute(command);

		expect(measureRepositoryMock.surveyContainsMeasures).toHaveBeenCalledTimes(1);
		expect(unitRepositoryMock.getLastCreatedForSurvey).toHaveBeenCalledTimes(2);
		expect(manifestationRepositoryMock.getLastCreatedForSurvey).toHaveBeenCalledTimes(0);
		expect(measureServiceMock.findMeasures).toHaveBeenCalledTimes(3);
	});

	test('an exception is thrown when data has already been cloned', async () => {
		const clonedMeasureRepositoryMock: MockedObjectDeep<MeasureRepository> = {
			createMeasure: jest.fn().mockResolvedValue(domainMeasure),
			checkIfAlreadyMigrated: jest.fn().mockResolvedValue(true),
			surveyContainsMeasures: jest.fn().mockResolvedValue(true),
			findMeasures: jest.fn().mockResolvedValue([domainMeasure]),
			...(<any>{}),
		};

		const command = new CloneMeasuresFromPreviousSurveyCommand('__SURVEY_ID__');

		await expect(
			new CloneMeasuresFromPreviousSurveyHandler(
				surveyRepoMock,
				clonedMeasureRepositoryMock,
				unitRepositoryMock,
				manifestationRepositoryMock,
				measureServiceMock,
				cyclicMeasureServiceMock,
				cyclicMeasureRepositoryMock,
			).execute(command),
		).rejects.toThrow(SurveyAlreadyHasMeasuresException);
	});

	test('an exception is thrown when no decomposition data is found', async () => {
		await expect(
			new CloneMeasuresFromPreviousSurveyHandler(
				surveyRepoMock,
				measureRepositoryMock,
				emptyUnitRepositoryMock,
				emptyManifestationRepositoryMock,
				measureServiceMock,
				cyclicMeasureServiceMock,
				cyclicMeasureRepositoryMock,
			).findLastClonedUnit('__UNIT_ID__', '__SURVEY_ID__'),
		).rejects.toThrow(DecompositionCloneNotFoundException);

		await expect(
			new CloneMeasuresFromPreviousSurveyHandler(
				surveyRepoMock,
				measureRepositoryMock,
				emptyUnitRepositoryMock,
				emptyManifestationRepositoryMock,
				measureServiceMock,
				cyclicMeasureServiceMock,
				cyclicMeasureRepositoryMock,
			).findLastClonedManifestation('__UNIT_ID__', '__SURVEY_ID__'),
		).rejects.toThrow(DecompositionCloneNotFoundException);
	});
});
