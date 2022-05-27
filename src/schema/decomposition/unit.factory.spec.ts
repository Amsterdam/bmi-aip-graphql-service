import { UnitFactory } from './unit.factory';
import { domainUnit } from './__stubs__/unit';
import { Unit } from './models/unit.model';

describe('UnitFactory', () => {
	test('CreateUnit() constructs an instance of a Unit GraphQL model', () => {
		const result = UnitFactory.CreateUnit(domainUnit);
		expect(result).toEqual(expect.objectContaining(domainUnit));
		expect(result).toBeInstanceOf(Unit);
	});
});
