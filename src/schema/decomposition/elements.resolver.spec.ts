import { ElementsResolver } from './elements.resolver';
import { ElementsService } from './elements.service';
import { element1, element2 } from './__stubs__';

jest.mock('./elements.service');

describe('Decomposition / Elements / Resolver', () => {
	test('getSurveyElements returns an array of element objects', async () => {
		const resolver = new ElementsResolver(new ElementsService());
		const elements = await resolver.getSurveyElements('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7', 113);
		expect(elements).toEqual([element1, element2]);
	});

	test('getElementById returns an element object', async () => {
		const resolver = new ElementsResolver(new ElementsService());
		expect(await resolver.getElementById(element1.id)).toEqual(element1);
	});
});
