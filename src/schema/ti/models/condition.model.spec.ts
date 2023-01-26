import { Condition } from '../models/condition.model';

describe('Model / Condition', () => {
	test('constructs an Condition instance object', () => {
		const condition = new Condition();
		condition.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
		condition.unitId = '';

		expect(condition).toBeInstanceOf(Condition);
		expect(condition).toEqual({
			id: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
			unitId: '',
		});
	});
});
