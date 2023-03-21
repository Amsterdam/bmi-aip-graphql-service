import { MockedObjectDeep } from 'ts-jest';

import { UnitRepository } from '../unit.repository';
import { unitInput, domainUnit } from '../__stubs__';
import { UnitFactory } from '../unit.factory';

import { CreateUnitCommand } from './create-unit.command';
import { CreateUnitHandler } from './create-unit.handler';

const unitRepoMock: MockedObjectDeep<UnitRepository> = {
	createUnit: jest.fn().mockResolvedValue(domainUnit),
	...(<any>{}),
};

describe('CreateUnitHandler', () => {
	test('executes command', async () => {
		const command = new CreateUnitCommand(unitInput);
		const result = await new CreateUnitHandler(unitRepoMock).execute(command);

		expect(unitRepoMock.createUnit).toHaveBeenCalledTimes(1);
		expect(unitRepoMock.createUnit).toHaveBeenCalledWith(unitInput);

		expect(result).toEqual(UnitFactory.CreateUnit(domainUnit));
	});
});
