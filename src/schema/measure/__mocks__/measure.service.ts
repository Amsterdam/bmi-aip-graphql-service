import { measure1, measure2 } from '../__stubs__';

export const MeasureService = jest.fn(() => ({
	getMeasures: jest.fn(() => [measure1, measure2]),
	getMeasureById: jest.fn(() => measure1),
}));
