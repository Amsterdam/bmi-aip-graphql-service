import { Element } from './element.model';

describe('Decomposition / Model / Element', () => {
	test('constructs an Element instance object', () => {
		const element = new Element();
		element.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
		element.code = 113;
		element.surveyId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
		element.location = 'Aan de zuidzijde';
		element.name = 'Wegmarkering';

		expect(element).toEqual(
			expect.objectContaining({
				id: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
				code: 113,
				surveyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
				location: 'Aan de zuidzijde',
				name: 'Wegmarkering',
			}),
		);
	});
});
