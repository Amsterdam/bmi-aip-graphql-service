import { ManifestationFactory } from './manifestation.factory';
import { domainManifestation } from './__stubs__/manifestation';
import { Manifestation } from './models/manifestation.model';

describe('ManifestationFactory', () => {
	test('CreateManifestation() constructs an instance of a Manifestation GraphQL model', () => {
		const result = ManifestationFactory.CreateManifestation(domainManifestation);
		expect(result).toEqual(expect.objectContaining(domainManifestation));
		expect(result).toBeInstanceOf(Manifestation);
	});
});
