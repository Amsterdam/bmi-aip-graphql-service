import { MockedObjectDeep } from 'ts-jest';

import { element1, element2 } from '../__stubs__';
import { ElementService } from '../element.service';

import { FindSurveyElementsCommand } from './find-survey-elements.command';
import { FindSurveyElementsHandler } from './find-survey-elements.handler';

const elementServiceMock: MockedObjectDeep<ElementService> = {
	getElements: jest.fn().mockResolvedValue([element1, element2]),
	...(<any>{}),
};

describe('FindSurveyElementsCommand', () => {
	test('executes command', async () => {
		const command = new FindSurveyElementsCommand('__SURVEY_ID__');
		const result = await new FindSurveyElementsHandler(elementServiceMock).execute(command);

		expect(elementServiceMock.getElements).toHaveBeenCalledTimes(1);
		expect(elementServiceMock.getElements).toHaveBeenCalledWith('__SURVEY_ID__');

		expect(result).toEqual([element1, element2]);
	});
});
