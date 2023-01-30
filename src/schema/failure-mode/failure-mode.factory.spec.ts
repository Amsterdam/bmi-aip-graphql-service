import { CreateFailureModeInput } from './dto/create-failure-mode.input';
import { FailureModeFactory } from './failure-mode.factory';
import { domainFailureMode } from './__stubs__';
import { FailureMode } from './models/failure-mode.model';

describe('FailureModeFactory', () => {
	test('CreateFailureMode() constructs an instance of an FailureMode GraphQL model', () => {
		const result = FailureModeFactory.CreateFailureMode(domainFailureMode);
		// const object = {
		// 	...domainFailureMode,
		// 	purpose: domainFailureMode.function,
		// 	createdAt: domainFailureMode.created_at ?? null,
		// 	updatedAt: domainFailureMode.updated_at ?? null,
		// };
		// expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(FailureMode);
	});

	test('CreateFailureModeInput', () => {
		const result = FailureModeFactory.CreateFailureModeInput('__UNIT_ID__');
		expect(result).toEqual({
			unitId: '__UNIT_ID__',
		});
		expect(result).toBeInstanceOf(CreateFailureModeInput);
	});
});
