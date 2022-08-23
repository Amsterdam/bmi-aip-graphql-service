import { supportSystem1, supportSystem2 } from '../__stubs__';

export const SupportSystemService = jest.fn(() => ({
	getSupportSystems: jest.fn(() => [supportSystem1, supportSystem2]),
}));
