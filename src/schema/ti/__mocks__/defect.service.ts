import { defect } from '../__stubs__';

export const DefectService = jest.fn(() => ({
	getDefect: jest.fn(() => defect),
}));
