import { CreateFailureModeInput } from './dto/create-failure-mode.input';
import { FailureModeFactory } from './failure-mode.factory';

describe('FailureModeFactory', () => {
	test('CreateFailureModeInput', () => {
		const result = FailureModeFactory.CreateFailureModeInput('__UNIT_ID__');
		expect(result).toEqual({
			unitId: '__UNIT_ID__',
		});
		expect(result).toBeInstanceOf(CreateFailureModeInput);
	});
});
