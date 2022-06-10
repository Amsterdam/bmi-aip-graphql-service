import { domainUnit } from '../__stubs__';

import { Unit } from './unit.model';

describe('Decomposition / Model / Unit', () => {
	test('constructs a Unit instance object', () => {
		const unit = Object.keys(domainUnit).reduce((model, key) => {
			model[key] = domainUnit[key];
			return model;
		}, new Unit());

		expect(unit).toBeInstanceOf(Unit);
		expect(unit).toEqual(domainUnit);
	});
});
