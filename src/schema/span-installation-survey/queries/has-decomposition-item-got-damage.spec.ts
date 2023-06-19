import { MockedObjectDeep } from 'ts-jest';

import { JunctionBoxSurveyService } from '../junction-box-survey.service';
import { SpanDecompositionItemType } from '../../span-installation/types/span-decomposition-item-type';
import { FacadeSurveyService } from '../facade-survey.service';
import { LuminaireSurveyService } from '../luminaire-survey.service';
import { MastSurveyService } from '../mast-survey.service';
import { NodeSurveyService } from '../node-survey.service';
import { TensionWireSurveyService } from '../tension-wire-survey.service';

import { HasDecompositionItemGotDamageHandler } from './has-decomposition-item-got-damage.handler';
import { HasDecompositionItemGotDamageQuery } from './has-decomposition-item-got-damage.query';

const junctionBoxServiceMock: MockedObjectDeep<JunctionBoxSurveyService> = {
	hasDamage: jest.fn().mockResolvedValue(true),
	...(<any>{}),
};
const facadeSurveyServiceMock: MockedObjectDeep<FacadeSurveyService> = {
	hasDamage: jest.fn().mockResolvedValue(true),
	...(<any>{}),
};
const mastSurveyServiceMock: MockedObjectDeep<MastSurveyService> = {
	hasDamage: jest.fn().mockResolvedValue(true),
	...(<any>{}),
};
const nodeSurveyServiceMock: MockedObjectDeep<NodeSurveyService> = {
	hasDamage: jest.fn().mockResolvedValue(true),
	...(<any>{}),
};
const tensionWireSurveyServiceMock: MockedObjectDeep<TensionWireSurveyService> = {
	hasDamage: jest.fn().mockResolvedValue(true),
	...(<any>{}),
};
const luminaireSurveyServiceMock: MockedObjectDeep<LuminaireSurveyService> = {
	hasDamage: jest.fn().mockResolvedValue(true),
	...(<any>{}),
};

const decompositionItemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('HasDecompositionItemGotDamageHandler', () => {
	test('executes query', async () => {
		const command = new HasDecompositionItemGotDamageQuery(
			decompositionItemId,
			SpanDecompositionItemType.spanJunctionBox,
		);
		await new HasDecompositionItemGotDamageHandler(
			junctionBoxServiceMock,
			facadeSurveyServiceMock,
			mastSurveyServiceMock,
			nodeSurveyServiceMock,
			tensionWireSurveyServiceMock,
			luminaireSurveyServiceMock,
		).execute(command);

		expect(junctionBoxServiceMock.hasDamage).toHaveBeenCalledTimes(1);
		expect(junctionBoxServiceMock.hasDamage).toHaveBeenCalledWith(decompositionItemId);
	});
});
