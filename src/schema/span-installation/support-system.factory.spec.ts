import { SupportSystemFactory } from './support-system.factory';
import { domainSupportSystem } from './__stubs__';
import { SupportSystem } from './models/support-system.model';

describe('Span Installation / SupportSystem / Factory', () => {
	test('CreateSupportSystem() constructs an instance of a SupportSystem GraphQL model', () => {
		const result = SupportSystemFactory.CreateSupportSystem(domainSupportSystem);
		const object = {
			...domainSupportSystem,
			createdAt: domainSupportSystem.created_at ?? null,
			updatedAt: domainSupportSystem.updated_at ?? null,
			deletedAt: domainSupportSystem.deleted_at ?? null,
		};
		delete object.created_at;
		delete object.updated_at;
		delete object.deleted_at;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(SupportSystem);
	});
});
