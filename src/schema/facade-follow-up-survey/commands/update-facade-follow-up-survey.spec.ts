import { MockedObjectDeep } from 'ts-jest';

import { FacadeFollowUpSurveyRepository } from '../facade-follow-up-survey.repository';
import { updateFacadeFollowUpSurveyInput, FacadeFollowUpSurvey } from '../__stubs__/facade-follow-up-survey-stub';

import { UpdateFacadeFollowUpSurveyCommand } from './update-facade-follow-up-survey.command';
import { UpdateFacadeFollowUpSurveyHandler } from './update-facade-follow-up-survey.handler';

const FacadeFollowUpSurveyRepoMock: MockedObjectDeep<FacadeFollowUpSurveyRepository> = {
	createArkSurvey: jest.fn().mockResolvedValue(FacadeFollowUpSurvey),
	...(<any>{}),
};

describe('UpdateFacadeFollowUpSurveyHandler', () => {
	test('executes command', async () => {
		const command = new UpdateFacadeFollowUpSurveyCommand(updateFacadeFollowUpSurveyInput);
		const result = await new UpdateFacadeFollowUpSurveyHandler(FacadeFollowUpSurveyRepoMock).execute(command);

		expect(FacadeFollowUpSurveyRepoMock.updateFacadeFollowUpSurvey).toHaveBeenCalledTimes(1);
		expect(FacadeFollowUpSurveyRepoMock.updateFacadeFollowUpSurvey).toHaveBeenCalledWith(
			updateFacadeFollowUpSurveyInput,
		);

		expect(result).toEqual(FacadeFollowUpSurvey);
	});
});
