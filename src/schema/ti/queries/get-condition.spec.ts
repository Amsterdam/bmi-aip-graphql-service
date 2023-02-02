import { MockedObjectDeep } from 'ts-jest';

import { ConditionService } from '../condition.service';
import { domainCondition } from '../__stubs__';

import { GetConditionQuery } from './get-condition.query';
import { GetConditionHandler } from './get-condition.handler';

const conditionMock: MockedObjectDeep<ConditionService> = {
	getCondition: jest.fn().mockResolvedValue([domainCondition]),
	...(<any>{}),
};

const conditionId = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('getConditionHandler', () => {
	test('executes command', async () => {
		const command = new GetConditionQuery(conditionId);
		const result = await new GetConditionHandler(conditionMock).execute(command);

		expect(conditionMock.getCondition).toHaveBeenCalledTimes(1);
		expect(conditionMock.getCondition).toHaveBeenCalledWith(conditionId);

		expect(result).toEqual([domainCondition]);
	});
});
