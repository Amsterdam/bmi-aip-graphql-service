import { UnitFactory } from './unit.factory';
import { domainUnit } from './__stubs__';
import { Unit } from './models/unit.model';

describe('UnitFactory', () => {
	test('CreateUnit() constructs an instance of a Unit GraphQL model', () => {
		const result = UnitFactory.CreateUnit(domainUnit);
		const object = { ...domainUnit, deletedAt: domainUnit.deleted_at };
		delete object.deleted_at;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(Unit);
	});
});
