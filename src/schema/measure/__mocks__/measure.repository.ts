import { domainMeasure, measure1 } from '../__stubs__';

export const MeasureRepository = jest.fn(() => ({
	createMeasure: jest.fn(() => measure1),
	findMeasures: jest.fn(() => [domainMeasure]),
}));
