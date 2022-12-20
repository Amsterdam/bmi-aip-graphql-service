import { cyclicMeasure1, cyclicMeasure2 } from '../__stubs__';

export const CyclicMeasureService = jest.fn(() => ({
	getCyclicMeasures: jest.fn(() => [cyclicMeasure1, cyclicMeasure2]),
	getCyclicMeasureById: jest.fn(() => cyclicMeasure1),
}));
