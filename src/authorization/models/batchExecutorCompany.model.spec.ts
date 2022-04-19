import { BatchExecutorCompany } from './batchExecutorCompany.model';

describe('BatchExecutorCompany / Model', () => {
	test('constructs an BatchExecutorCompany instance object', () => {
		const batchExecutorCompany = new BatchExecutorCompany();
		batchExecutorCompany.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
		batchExecutorCompany.companyId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
		batchExecutorCompany.batchId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';

		expect(batchExecutorCompany).toEqual(
			expect.objectContaining({
				id: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
				companyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
				batchId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
			}),
		);
	});
});
