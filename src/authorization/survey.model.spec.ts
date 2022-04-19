import { Survey } from './survey.model';

describe('Survey / Model', () => {
	test('constructs an Survey instance object', () => {
		const survey = new Survey();
		survey.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
		survey.objectId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584fe2';

		expect(survey).toEqual(
			expect.objectContaining({
				id: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
				objectId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584fe2',
			}),
		);
	});
});
