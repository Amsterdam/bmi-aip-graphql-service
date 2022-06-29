import { MockedObjectDeep } from 'ts-jest';

import { unit } from '../__stubs__';
import { UnitService } from '../unit.service';

import { FindElementUnitsHandler } from './find-element-units.handler';
import { FindElementUnitsCommand } from './find-element-units.command';

const unitServiceMock: MockedObjectDeep<UnitService> = {
	getUnits: jest.fn().mockResolvedValue([unit]),
	...(<any>{}),
};

describe('FindElementUnitsHandler', () => {
	test('executes command', async () => {
		const command = new FindElementUnitsCommand('__ELEMENT_ID__');
		const result = await new FindElementUnitsHandler(unitServiceMock).execute(command);

		expect(unitServiceMock.getUnits).toHaveBeenCalledTimes(1);
		expect(unitServiceMock.getUnits).toHaveBeenCalledWith('__ELEMENT_ID__');

		expect(result).toEqual([unit]);
	});
});
