import { domainUnit } from '../__stubs__';

import { Unit } from './unit.model';

test('Unit Domain Model', () => {
	const unit = Object.keys(domainUnit).reduce((model, key) => {
		model[key] = domainUnit[key];
		return model;
	}, new Unit());

	expect(unit).toBeInstanceOf(Unit);
	expect(unit).toEqual(domainUnit);
});
