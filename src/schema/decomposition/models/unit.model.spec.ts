import { domainManifestation } from '../__stubs__/manifestation';

import { Manifestation } from './manifestation.model';

test('Manifestation Domain Model', () => {
	const manifestation = Object.keys(domainManifestation).reduce((model, key) => {
		model[key] = domainManifestation[key];
		return model;
	}, new Manifestation());

	expect(manifestation).toBeInstanceOf(Manifestation);
	expect(manifestation).toEqual(domainManifestation);
});
