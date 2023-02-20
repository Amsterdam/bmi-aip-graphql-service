import { domainCyclicMeasure, cyclicMeasure1 } from '../__stubs__';

export const CyclicMeasureRepository = jest.fn(() => ({
	createCyclicMeasure: jest.fn(() => cyclicMeasure1),
	generateCyclicMeasures: jest.fn(() => [cyclicMeasure1]),
	findCyclicMeasures: jest.fn(() => [domainCyclicMeasure]),
}));
