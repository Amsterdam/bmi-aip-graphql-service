import { ElementFactory } from './element.factory';
import { domainElement } from './__stubs__';
import { Element } from './models/element.model';

describe('ElementFactory', () => {
	test('CreateElement() constructs an instance of an Element GraphQL model', () => {
		const result = ElementFactory.CreateElement(domainElement);
		const object = { ...domainElement, deletedAt: domainElement.deleted_at };
		delete object.deleted_at;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(Element);
	});
});
