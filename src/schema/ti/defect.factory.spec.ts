import { DefectFactory } from './defect.factory';
import { domainDefect } from './__stubs__';
import { Defect } from './models/defect.model';

describe('Defect / Factory', () => {
	test('CreateDefect() constructs an instance of a Defect GraphQL model', () => {
		const result = DefectFactory.CreateDefect(domainDefect);
		const object = {
			...domainDefect,
			createdAt: domainDefect.created_at ?? null,
			updatedAt: domainDefect.updated_at ?? null,
		};
		delete object.created_at;
		delete object.updated_at;
		delete object.riscLevel;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(Defect);
	});
});
