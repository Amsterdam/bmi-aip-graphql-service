import { MockedObjectDeep } from 'ts-jest';

import { UnitService } from '../unit.service';
import { domainUnit } from '../__stubs__';

import { DeleteUnitCommand } from './delete-unit.command';
import { DeleteUnitHandler } from './delete-unit.handler';

const unitServiceMock: MockedObjectDeep<UnitService> = {
	deleteUnit: jest.fn().mockResolvedValue(domainUnit),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('DeleteUnitHandler', () => {
	test('executes command', async () => {
		const command = new DeleteUnitCommand(identifier);
		const result = await new DeleteUnitHandler(unitServiceMock).execute(command);

		expect(unitServiceMock.deleteUnit).toHaveBeenCalledTimes(1);
		expect(unitServiceMock.deleteUnit).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(domainUnit);
	});
});
