import { ElementFactory } from './element.factory';
import { domainElement } from './__stubs__';
import { Element } from './models/element.model';

describe('ElementFactory', () => {
	test('CreateElement() constructs an instance of a Element GraphQL model', () => {
		const result = ElementFactory.CreateElement(domainElement);
		expect(result).toEqual(expect.objectContaining(domainElement));
		expect(result).toBeInstanceOf(Element);
	});
});
