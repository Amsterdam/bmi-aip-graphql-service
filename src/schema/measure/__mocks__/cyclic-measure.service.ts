import { cyclicMeasure1, cyclicMeasure2 } from '../__stubs__';

export const CyclicMeasureService = jest.fn(() => ({
	findCyclicMeasures: jest.fn(() => [cyclicMeasure1, cyclicMeasure2]),
	generateCyclicMeasures: jest.fn(() => [cyclicMeasure1, cyclicMeasure2]),
	findCyclicMeasureById: jest.fn(() => cyclicMeasure1),
}));
