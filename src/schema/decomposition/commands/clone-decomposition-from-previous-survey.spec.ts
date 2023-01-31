import { MockedObjectDeep } from 'ts-jest';

import { DecompositionRepository } from '../decomposition.repository';
import { domainElement } from '../__stubs__';

import { CloneDecompositionFromPreviousSurveyCommand } from './clone-decomposition-from-previous-survey.command';

const decompositionRepoMock: MockedObjectDeep<DecompositionRepository> = {
	findPreviousSurveyId: jest.fn().mockResolvedValue('__PREVIOUS_SURVEY_ID__'),
	checkIfAlreadyMigrated: jest.fn().mockResolvedValue(false),
	cloneDecomposition: jest.fn().mockResolvedValue([domainElement, domainElement]),
	...(<any>{}),
};

describe('CloneDecompositionFromPreviousSurveyCommand', () => {
	test('executes command', async () => {
		new CloneDecompositionFromPreviousSurveyCommand('__SURVEY_ID__');
		expect(decompositionRepoMock.cloneDecomposition).toHaveBeenCalledTimes(1);
	});
});
