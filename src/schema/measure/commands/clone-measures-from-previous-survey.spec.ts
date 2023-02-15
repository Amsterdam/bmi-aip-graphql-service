import { SurveyRepository } from 'src/schema/survey/survey.repository';
import { MockedObjectDeep } from 'ts-jest';

import { MeasureRepository } from '../measure.repository';
import { domainMeasure } from '../__stubs__';

import { CloneMeasuresFromPreviousSurveyCommand } from './clone-measures-from-previous-survey.command';
import { CloneMeasuresFromPreviousSurveyHandler } from './clone-measures-from-previous-survey.handler';

const measureRepositoryMock: MockedObjectDeep<MeasureRepository> = {
	checkIfAlreadyMigrated: jest.fn().mockResolvedValue(false),
	cloneMeasures: jest.fn().mockResolvedValue([domainMeasure, domainMeasure]),
	surveyContainsMeasures: jest.fn().mockResolvedValue(false),
	...(<any>{}),
};

const surveyRepoMock: MockedObjectDeep<SurveyRepository> = {
	findIdPreviousNen2767OrFmecaSurvey: jest.fn().mockResolvedValue('__PREVIOUS_SURVEY_ID__'),
	...(<any>{}),
};

describe('CloneMeasuresFromPreviousSurveyCommand', () => {
	test('executes command', async () => {
		const command = new CloneMeasuresFromPreviousSurveyCommand('__SURVEY_ID__');
		await new CloneMeasuresFromPreviousSurveyHandler(surveyRepoMock, measureRepositoryMock).execute(command);

		expect(measureRepositoryMock.cloneMeasures).toHaveBeenCalledTimes(1);
	});
});
