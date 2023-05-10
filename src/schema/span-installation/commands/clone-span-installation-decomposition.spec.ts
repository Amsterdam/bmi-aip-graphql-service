import { MockedObjectDeep } from 'ts-jest';

import { SurveyRepository } from '../../survey/survey.repository';
import { domainSurvey } from '../../survey/__stubs__';
import { domainJunctionBox, domainSupportSystem } from '../__stubs__';
import { JunctionBoxRepository } from '../junction-box.repository';
import { SupportSystemRepository } from '../support-system.repository';
import { JunctionBoxFactory } from '../junction-box.factory';
import { SupportSystemFactory } from '../support-system.factory';

import { CloneSpanInstallationDecompositionCommand } from './clone-span-installation-decomposition.command';
import { CloneSpanInstallationDecompositionHandler } from './clone-span-installation-decomposition.handler';

const junctionBoxRepoMock: MockedObjectDeep<JunctionBoxRepository> = {
	cloneJunctionBoxes: jest.fn().mockResolvedValue([domainJunctionBox]),
	...(<any>{}),
};

const supportSystemRepoMock: MockedObjectDeep<SupportSystemRepository> = {
	cloneSupportSystems: jest.fn().mockResolvedValue([domainSupportSystem]),
	...(<any>{}),
};

const surveyRepoMock: MockedObjectDeep<SurveyRepository> = {
	findOVSSurveyIdBySpanObject: jest.fn().mockResolvedValue(domainSurvey),
	...(<any>{}),
};

describe('CloneSpanInstallationDecompositionHandler', () => {
	test('executes command', async () => {
		const command = new CloneSpanInstallationDecompositionCommand('__OBJECT_ID__', '__SURVEY_ID__');
		const result = await new CloneSpanInstallationDecompositionHandler(
			junctionBoxRepoMock,
			supportSystemRepoMock,
			surveyRepoMock,
		).execute(command);

		const expectedJunctionBox = JunctionBoxFactory.CreateJunctionBox(domainJunctionBox);
		const expectedSupportSystem = SupportSystemFactory.CreateSupportSystem(domainSupportSystem);

		expect(junctionBoxRepoMock.cloneJunctionBoxes).toHaveBeenCalledTimes(1);
		expect(supportSystemRepoMock.cloneSupportSystems).toHaveBeenCalledTimes(1);
		expect(surveyRepoMock.findOVSSurveyIdBySpanObject).toHaveBeenCalledWith('__OBJECT_ID__');

		expect(result).toEqual([expectedJunctionBox, expectedSupportSystem]);
	});
});
