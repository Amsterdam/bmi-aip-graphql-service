import { MockedObjectDeep } from 'ts-jest';

import { UnitRepository } from '../unit.repository';
import { domainUnit, updateUnitInput } from '../__stubs__';
import { UnitFactory } from '../unit.factory';

import { UpdateUnitCommand } from './update-unit.command';
import { UpdateUnitHandler } from './update-unit.handler';

const unitRepoMock: MockedObjectDeep<UnitRepository> = {
	updateUnit: jest.fn().mockResolvedValue(domainUnit),
	...(<any>{}),
};

describe('UpdateUnitHandler', () => {
	test('executes command', async () => {
		const command = new UpdateUnitCommand(updateUnitInput);
		const result = await new UpdateUnitHandler(unitRepoMock).execute(command);

		expect(unitRepoMock.updateUnit).toHaveBeenCalledTimes(1);
		expect(unitRepoMock.updateUnit).toHaveBeenCalledWith(updateUnitInput);

		expect(result).toEqual(UnitFactory.CreateUnit(domainUnit));
	});
});
