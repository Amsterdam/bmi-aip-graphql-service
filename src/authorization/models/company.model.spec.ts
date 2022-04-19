import { Company } from './company.model';

describe('Company / Model', () => {
	test('constructs an Company instance object', () => {
		const company = new Company();
		company.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
		company.role = 'Owner';
		company.name = 'Gemeente Amsterdam';

		expect(company).toEqual(
			expect.objectContaining({
				id: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
				role: 'Owner',
				name: 'Gemeente Amsterdam',
			}),
		);
	});
});
