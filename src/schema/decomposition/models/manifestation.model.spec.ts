import { domainManifestation } from '../__stubs__';

import { Manifestation } from './manifestation.model';

describe('Decomposition / Model / Manifestation', () => {
	test('constructs a Manifestation instance object', () => {
		const unit = Object.keys(domainManifestation).reduce((model, key) => {
			model[key] = domainManifestation[key];
			return model;
		}, new Manifestation());

		expect(unit).toBeInstanceOf(Manifestation);
		expect(unit).toEqual(domainManifestation);
	});
});
