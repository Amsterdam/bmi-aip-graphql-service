import { LuminaireFactory } from './luminaire.factory';
import { domainLuminaire } from './__stubs__';
import { Luminaire } from './models/luminaire.model';

describe('Span Installation / Luminaire / Factory', () => {
	test('CreateLuminaire() constructs an instance of a Luminaire GraphQL model', () => {
		const result = LuminaireFactory.CreateLuminaire(domainLuminaire);
		const object = {
			...domainLuminaire,
			createdAt: domainLuminaire.created_at ?? null,
			updatedAt: domainLuminaire.updated_at ?? null,
			deletedAt: domainLuminaire.deleted_at ?? null,
			mastNumber: Number(domainLuminaire.mastNumber),
		};
		delete object.created_at;
		delete object.updated_at;
		delete object.deleted_at;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(Luminaire);
	});
});
