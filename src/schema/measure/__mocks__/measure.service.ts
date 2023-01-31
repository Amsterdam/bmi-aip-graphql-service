import { measure1, measure2 } from '../__stubs__';

export const MeasureService = jest.fn(() => ({
	findMeasures: jest.fn(() => [measure1, measure2]),
	findMeasureById: jest.fn(() => measure1),
}));
