import { MockedObjectDeep } from 'ts-jest';

import { junctionBoxSurvey } from '../__stubs__';
import { JunctionBoxSurveyService } from '../junction-box-survey.service';
import { SpanDecompositionItemType } from '../../span-installation/types/span-decomposition-item-type';
import { FacadeSurveyService } from '../facade-survey.service';
import { LuminaireSurveyService } from '../luminaire-survey.service';
import { MastSurveyService } from '../mast-survey.service';
import { NodeSurveyService } from '../node-survey.service';
import { TensionWireSurveyService } from '../tension-wire-survey.service';

import { GetDecompositionItemDamageHandler } from './get-decomposition-item-damage.handler';
import { GetDecompositionItemDamageQuery } from './get-decomposition-item-damage.query';

const junctionBoxServiceMock: MockedObjectDeep<JunctionBoxSurveyService> = {
	getJunctionBoxSurveyOnPermanentId: jest.fn().mockResolvedValue(junctionBoxSurvey),
	...(<any>{}),
};

const facadeSurveyServiceMock: MockedObjectDeep<FacadeSurveyService> = {
	...(<any>{}),
};

const mastSurveyServiceMock: MockedObjectDeep<MastSurveyService> = {
	...(<any>{}),
};

const nodeSurveyServiceMock: MockedObjectDeep<NodeSurveyService> = {
	...(<any>{}),
};

const tensionWireSurveyServiceMock: MockedObjectDeep<TensionWireSurveyService> = {
	...(<any>{}),
};

const luminaireSurveyServiceMock: MockedObjectDeep<LuminaireSurveyService> = {
	...(<any>{}),
};

const decompositionItemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('GetDecompositionItemDamageHandler', () => {
	test('executes query', async () => {
		const command = new GetDecompositionItemDamageQuery(
			decompositionItemId,
			SpanDecompositionItemType.spanJunctionBox,
		);

		await new GetDecompositionItemDamageHandler(
			junctionBoxServiceMock,
			facadeSurveyServiceMock,
			mastSurveyServiceMock,
			nodeSurveyServiceMock,
			tensionWireSurveyServiceMock,
			luminaireSurveyServiceMock,
		).execute(command);

		expect(junctionBoxServiceMock.getJunctionBoxSurveyOnPermanentId).toHaveBeenCalledTimes(1);
		expect(junctionBoxServiceMock.getJunctionBoxSurveyOnPermanentId).toHaveBeenCalledWith(decompositionItemId);
	});
});
