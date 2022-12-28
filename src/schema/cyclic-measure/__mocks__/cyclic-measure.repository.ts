import { domainCyclicMeasure, cyclicMeasure1 } from '../__stubs__';

export const CyclicMeasureRepository = jest.fn(() => ({
	createCyclicMeasure: jest.fn(() => cyclicMeasure1),
	getCyclicMeasures: jest.fn(() => [domainCyclicMeasure]),
}));
