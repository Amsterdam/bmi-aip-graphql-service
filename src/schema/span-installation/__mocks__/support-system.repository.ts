import { domainSupportSystem, reviseSupportSystem1, supportSystem1 } from '../__stubs__';

export const SupportSystemRepository = jest.fn(() => ({
	createSupportSystem: jest.fn(() => supportSystem1),
	createMissingSupportSystem: jest.fn(() => reviseSupportSystem1),
	getSupportSystems: jest.fn(() => [domainSupportSystem]),
}));
