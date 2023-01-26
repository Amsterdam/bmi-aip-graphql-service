import { MockedObjectDeep } from 'ts-jest';

import { ConditionRepository } from '../condition.repository';
import { conditionInput, domainCondition } from '../__stubs__';
import { CreateConditionCommand } from '../commands/create-condition.command';
import { CreateConditionHandler } from '../commands/create-condition.handler';

const conditionRepoMock: MockedObjectDeep<ConditionRepository> = {
	createCondition: jest.fn().mockResolvedValue(domainCondition),
	...(<any>{}),
};

describe('CreateConditionHandler', () => {
	test('executes command', async () => {
		const command = new CreateConditionCommand(conditionInput);
		const result = await new CreateConditionHandler(conditionRepoMock).execute(command);

		expect(conditionRepoMock.createCondition).toHaveBeenCalledTimes(1);
		expect(conditionRepoMock.createCondition).toHaveBeenCalledWith(conditionInput);

		expect(result).toEqual(domainCondition);
	});
});
