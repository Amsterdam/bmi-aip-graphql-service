import { ManifestationFactory } from './manifestation.factory';
import { domainManifestation } from './__stubs__';
import { Manifestation } from './models/manifestation.model';

describe('ManifestationFactory', () => {
	test('CreateManifestation() constructs an instance of a Manifestation GraphQL model', () => {
		const result = ManifestationFactory.CreateManifestation(domainManifestation);
		const object = { ...domainManifestation, deletedAt: domainManifestation.deleted_at };
		delete object.deleted_at;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(Manifestation);
	});
});
