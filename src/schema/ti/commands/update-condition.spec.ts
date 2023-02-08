import { MockedObjectDeep } from 'ts-jest';

import { ConditionRepository } from '../condition.repository';
import { domainCondition, updateConditionInput } from '../__stubs__';
import { UpdateConditionCommand } from '../commands/update-condition.command';
import { UpdateConditionHandler } from '../commands/update-condition.handler';

const conditionRepoMock: MockedObjectDeep<ConditionRepository> = {
	updateCondition: jest.fn().mockResolvedValue(domainCondition),
	...(<any>{}),
};

describe('UpdateConditionHandler', () => {
	test('executes command', async () => {
		const command = new UpdateConditionCommand(updateConditionInput);
		const result = await new UpdateConditionHandler(conditionRepoMock).execute(command);

		expect(conditionRepoMock.updateCondition).toHaveBeenCalledTimes(1);
		expect(conditionRepoMock.updateCondition).toHaveBeenCalledWith(updateConditionInput);

		expect(result).toEqual(domainCondition);
	});
});
