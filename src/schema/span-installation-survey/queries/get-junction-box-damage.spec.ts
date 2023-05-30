import { MockedObjectDeep } from 'ts-jest';

import { junctionBoxSurvey } from '../__stubs__';
import { JunctionBoxSurveyService } from '../junction-box-survey.service';

import { GetJunctionBoxDamageQuery } from './get-junction-box-damage.query';
import { GetJunctionBoxDamageHandler } from './get-junction-box-damage.handler';

const junctionBoxServiceMock: MockedObjectDeep<JunctionBoxSurveyService> = {
	getJunctionBoxSurveyOnPermanentId: jest.fn().mockResolvedValue(junctionBoxSurvey),
	...(<any>{}),
};

const junctionBoxId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('GetJunctionBoxDamageHandler', () => {
	test('executes query', async () => {
		const command = new GetJunctionBoxDamageQuery(junctionBoxId);
		const result = await new GetJunctionBoxDamageHandler(junctionBoxServiceMock).execute(command);

		expect(junctionBoxServiceMock.getJunctionBoxSurveyOnPermanentId).toHaveBeenCalledTimes(1);
		expect(junctionBoxServiceMock.getJunctionBoxSurveyOnPermanentId).toHaveBeenCalledWith(junctionBoxId);

		expect(result).toEqual(junctionBoxSurvey);
	});
});
