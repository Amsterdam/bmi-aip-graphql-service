import { domainDefect } from '../__stubs__';

export const DefectRepository = jest.fn(() => ({
	getDefect: jest.fn(() => domainDefect),
}));
