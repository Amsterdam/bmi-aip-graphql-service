import { MockedObjectDeep } from 'ts-jest';

import { JunctionBoxSurveyService } from '../junction-box-survey.service';
import { SpanDecompositionType } from '../../span-installation/types/span-decomposition-type';

import { HasDecompositionItemGotDamageQuery } from './has-decomposition-item-got-damage.query';
import { HasDecompositionItemGotDamageHandler } from './has-decomposition-item-got-damage.handler';

const junctionBoxServiceMock: MockedObjectDeep<JunctionBoxSurveyService> = {
	hasDamage: jest.fn().mockResolvedValue(true),
	...(<any>{}),
};

const decompositionId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('HasDecompositionItemGotDamageHandler', () => {
	test('executes query', async () => {
		const command = new HasDecompositionItemGotDamageQuery(decompositionId, SpanDecompositionType.spanJunctionBox);
		await new HasDecompositionItemGotDamageHandler(junctionBoxServiceMock).execute(command);

		expect(junctionBoxServiceMock.hasDamage).toHaveBeenCalledTimes(1);
		expect(junctionBoxServiceMock.hasDamage).toHaveBeenCalledWith(decompositionId);
	});
});
