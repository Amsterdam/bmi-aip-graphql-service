import { BatchObject } from './batchObject.model';

describe('BatchObject / Model', () => {
	test('constructs an BatchObject instance object', () => {
		const batchObject = new BatchObject();
		batchObject.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
		batchObject.objectId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584fe2';
		batchObject.batchId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';

		expect(batchObject).toEqual(
			expect.objectContaining({
				id: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
				objectId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584fe2',
				batchId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
			}),
		);
	});
});
