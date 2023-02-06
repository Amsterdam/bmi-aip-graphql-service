import { domainFailureMode, failureMode1 } from '../__stubs__';

export const FailureModeRepository = jest.fn(() => ({
	createFailureMode: jest.fn(() => failureMode1),
	findFailureModes: jest.fn(() => [domainFailureMode]),
}));
