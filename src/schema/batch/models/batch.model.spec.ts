import { Batch } from './batch.model';

describe('Batch / Model', () => {
	test('constructs an Batch instance object', () => {
		const batch = new Batch();
		batch.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
		batch.status = 'open';

		expect(batch).toEqual(
			expect.objectContaining({
				id: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
				status: 'open',
			}),
		);
	});
});
