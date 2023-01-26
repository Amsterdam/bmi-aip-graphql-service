import { MockedObjectDeep } from 'ts-jest';

import { DecompositionRepository } from '../decomposition.repository';
import { DecompositionCloneResult } from '../types/decomposition-clone-result';
// import { CloneDecompositionFromPreviousSurveyCommand } from './clone-decomposition-from-previous-survey.command';
// import { CloneDecompositionFromPreviousSurveyHandler } from './clone-decomposition-from-previous-survey.handler';

const decompositionRepoMock: MockedObjectDeep<DecompositionRepository> = {
	cloneDecompositionFromPreviousSurvey: jest
		.fn()
		.mockResolvedValue({ errors: [], messages: [] } as DecompositionCloneResult),
	...(<any>{}),
};

describe('CloneDecompositionFromPreviousSurveyCommand', () => {
	test('executes command', async () => {
		//const command = new CloneDecompositionFromPreviousSurveyCommand('__SURVEY_ID__');
		// const result = await new CloneDecompositionFromPreviousSurveyHandler(decompositionRepoMock).execute(command);

		expect(decompositionRepoMock.cloneDecomposition).toHaveBeenCalledTimes(1);
	});
});
