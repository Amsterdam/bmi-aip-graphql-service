import { MockedObjectDeep } from 'ts-jest';

import { SurveyRepository } from '../../survey/survey.repository';
import { domainSurvey } from '../../survey/__stubs__';
import { domainJunctionBox } from '../__stubs__';
import { JunctionBoxRepository } from '../junction-box.repository';

import { CloneJunctionBoxesFromOVSSurveyCommand } from './clone-junction-boxes-from-ovs-survey.command';
import { CloneJunctionBoxesFromOVSSurveyHandler } from './clone-junction-boxes-from-ovs-survey.handler';

const junctionBoxRepoMock: MockedObjectDeep<JunctionBoxRepository> = {
	cloneJunctionBoxes: jest.fn().mockResolvedValue(domainJunctionBox),
	...(<any>{}),
};

const surveyRepoMock: MockedObjectDeep<SurveyRepository> = {
	findOVSSurveyIdBySpanObject: jest.fn().mockResolvedValue(domainSurvey),
	...(<any>{}),
};

describe('CloneJunctionBoxesFromOVSSurveyHandler', () => {
	test('executes command', async () => {
		const command = new CloneJunctionBoxesFromOVSSurveyCommand(
			'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
			'68a95a2c-b909-e77f-4d66-9fd5afef5afb',
		);
		const result = await new CloneJunctionBoxesFromOVSSurveyHandler(junctionBoxRepoMock, surveyRepoMock).execute(
			command,
		);

		expect(junctionBoxRepoMock.cloneJunctionBoxes).toHaveBeenCalledTimes(1);
		expect(surveyRepoMock.findOVSSurveyIdBySpanObject).toHaveBeenCalledWith('f45c302c-6b18-85f6-bbe4-b3bf0a82d49a');

		expect(result).toEqual(domainJunctionBox);
	});
});
