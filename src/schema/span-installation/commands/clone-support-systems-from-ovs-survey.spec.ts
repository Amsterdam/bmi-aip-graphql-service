import { MockedObjectDeep } from 'ts-jest';

import { SurveyRepository } from '../../survey/survey.repository';
import { domainSurvey } from '../../survey/__stubs__';
import { SupportSystemRepository } from '../support-system.repository';
import { domainSupportSystem } from '../__stubs__';

import { CloneSupportSystemsFromOVSSurveyHandler } from './clone-support-systems-from-ovs-survey.handler';
import { CloneSupportSystemsFromOVSSurveyCommand } from './clone-support-systems-from-ovs-survey.command';

const supportSystemRepoMock: MockedObjectDeep<SupportSystemRepository> = {
	cloneSupportSystems: jest.fn().mockResolvedValue(domainSupportSystem),
	...(<any>{}),
};

const surveyRepoMock: MockedObjectDeep<SurveyRepository> = {
	findOVSSurveyIdBySpanObject: jest.fn().mockResolvedValue(domainSurvey),
	...(<any>{}),
};

describe('CloneSupportSystemsFromOVSSurveyHandler', () => {
	test('executes command', async () => {
		const command = new CloneSupportSystemsFromOVSSurveyCommand(
			'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
			'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
		);
		const result = await new CloneSupportSystemsFromOVSSurveyHandler(supportSystemRepoMock, surveyRepoMock).execute(
			command,
		);

		expect(supportSystemRepoMock.cloneSupportSystems).toHaveBeenCalledTimes(1);
		expect(surveyRepoMock.findOVSSurveyIdBySpanObject).toHaveBeenCalledWith('f45c302c-6b18-85f6-bbe4-b3bf0a82d49a');

		expect(result).toEqual(domainSupportSystem);
	});
});
