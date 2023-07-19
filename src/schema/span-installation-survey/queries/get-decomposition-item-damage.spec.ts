import { MockedObjectDeep } from 'ts-jest';

import { junctionBoxSurvey } from '../__stubs__';
import { JunctionBoxSurveyService } from '../junction-box-survey.service';
import { SpanDecompositionItemType } from '../../span-installation/types/span-decomposition-item-type';

import { GetDecompositionItemDamageQuery } from './get-decomposition-item-damage.query';
import { GetDecompositionItemDamageHandler } from './get-decomposition-item-damage.handler';

const junctionBoxServiceMock: MockedObjectDeep<JunctionBoxSurveyService> = {
	getJunctionBoxSurveyOnPermanentId: jest.fn().mockResolvedValue(junctionBoxSurvey),
	...(<any>{}),
};

const decompositionItemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('GetDecompositionItemDamageHandler', () => {
	test('executes query', async () => {
		const command = new GetDecompositionItemDamageQuery(
			decompositionItemId,
			SpanDecompositionItemType.spanJunctionBox,
		);
		await new GetDecompositionItemDamageHandler(junctionBoxServiceMock).execute(command);

		expect(junctionBoxServiceMock.getJunctionBoxSurveyOnPermanentId).toHaveBeenCalledTimes(1);
		expect(junctionBoxServiceMock.getJunctionBoxSurveyOnPermanentId).toHaveBeenCalledWith(decompositionItemId);
	});
});
