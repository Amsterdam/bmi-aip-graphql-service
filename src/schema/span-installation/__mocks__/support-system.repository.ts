import { domainSupportSystem, supportSystem1 } from '../__stubs__';

export const SupportSystemRepository = jest.fn(() => ({
	createSupportSystem: jest.fn(() => supportSystem1),
	getSupportSystems: jest.fn(() => [domainSupportSystem]),
}));
