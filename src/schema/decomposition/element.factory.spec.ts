import { gisibElement1 } from '../../gisib/__stubs__/gisibElement';

import { CreateElementInput } from './dto/create-element.input';
import { ElementFactory } from './element.factory';
import { domainElement } from './__stubs__';
import { Element } from './models/element.model';

describe('ElementFactory', () => {
	test('CreateElement() constructs an instance of a Element GraphQL model', () => {
		const result = ElementFactory.CreateElement(domainElement);
		expect(result).toEqual(expect.objectContaining(domainElement));
		expect(result).toBeInstanceOf(Element);
	});

	test('CreateElementInput', () => {
		const result = ElementFactory.CreateElementInput('__OBJECT_ID__', '__SURVEY_ID__', gisibElement1);
		expect(result).toEqual({
			code: 'BRU0238-115-1',
			gisibId: 653399,
			name: 'Binnenverlichting',
			objectId: '__OBJECT_ID__',
			surveyId: '__SURVEY_ID__',
		});
		expect(result).toBeInstanceOf(CreateElementInput);
	});
});
