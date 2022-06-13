import { domainElement } from '../__stubs__';

import { Element } from './element.model';

describe('Decomposition / Model / Element', () => {
	test('constructs an Element instance object', () => {
		const unit = Object.keys(domainElement).reduce((model, key) => {
			model[key] = domainElement[key];
			return model;
		}, new Element());

		expect(unit).toBeInstanceOf(Element);
		expect(unit).toEqual(domainElement);
	});
});
