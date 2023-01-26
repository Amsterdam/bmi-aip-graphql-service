import { MockedObjectDeep } from 'ts-jest';

import { ConditionService } from '../condition.service';
import { domainCondition } from '../__stubs__';

import { FindConditionsQuery } from './find-conditions.query';
import { FindConditionsHandler } from './find-conditions.handler';

const conditionMock: MockedObjectDeep<ConditionService> = {
	findConditions: jest.fn().mockResolvedValue([domainCondition]),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('FindConditionsHandler', () => {
	test('executes command', async () => {
		const command = new FindConditionsQuery(identifier);
		const result = await new FindConditionsHandler(conditionMock).execute(command);

		expect(conditionMock.findConditions).toHaveBeenCalledTimes(1);
		expect(conditionMock.findConditions).toHaveBeenCalledWith(identifier);

		expect(result).toEqual([domainCondition]);
	});
});
