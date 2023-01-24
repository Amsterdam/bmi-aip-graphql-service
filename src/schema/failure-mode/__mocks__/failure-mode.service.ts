import { failureMode1, failureMode2 } from '../__stubs__';

export const FailureModeService = jest.fn(() => ({
	findFailureModes: jest.fn(() => [failureMode1, failureMode2]),
	findFailureModeById: jest.fn(() => failureMode1),
}));
