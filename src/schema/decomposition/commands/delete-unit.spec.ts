import { MockedObjectDeep } from 'ts-jest';

import { UnitRepository } from '../unit.repository';
import { domainUnit } from '../__stubs__';

import { DeleteUnitCommand } from './delete-unit.command';
import { DeleteUnitHandler } from './delete-unit.handler';

const unitRepoMock: MockedObjectDeep<UnitRepository> = {
	deleteUnit: jest.fn().mockResolvedValue(domainUnit),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('DeleteUnitHandler', () => {
	test('executes command', async () => {
		const command = new DeleteUnitCommand(identifier);
		const result = await new DeleteUnitHandler(unitRepoMock).execute(command);

		expect(unitRepoMock.deleteUnit).toHaveBeenCalledTimes(1);
		expect(unitRepoMock.deleteUnit).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(domainUnit);
	});
});
