import { SurveyRepository } from 'src/schema/survey/survey.repository';
import { MockedObjectDeep } from 'ts-jest';

import { DecompositionRepository } from '../decomposition.repository';
import { domainElement } from '../__stubs__';

import { CloneDecompositionFromPreviousSurveyCommand } from './clone-decomposition-from-previous-survey.command';
import { CloneDecompositionFromPreviousSurveyHandler } from './clone-decomposition-from-previous-survey.handler';

const decompositionRepoMock: MockedObjectDeep<DecompositionRepository> = {
	checkIfAlreadyMigrated: jest.fn().mockResolvedValue(false),
	cloneDecomposition: jest.fn().mockResolvedValue([domainElement, domainElement]),
	...(<any>{}),
};

const surveyRepoMock: MockedObjectDeep<SurveyRepository> = {
	findPreviousSurveyId: jest.fn().mockResolvedValue('__PREVIOUS_SURVEY_ID__'),
	...(<any>{}),
};

describe('CloneDecompositionFromPreviousSurveyCommand', () => {
	test('executes command', async () => {
		const command = new CloneDecompositionFromPreviousSurveyCommand('__SURVEY_ID__');
		await new CloneDecompositionFromPreviousSurveyHandler(decompositionRepoMock, surveyRepoMock).execute(command);

		expect(decompositionRepoMock.cloneDecomposition).toHaveBeenCalledTimes(1);
	});
});
