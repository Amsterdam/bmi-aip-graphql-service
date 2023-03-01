import { CyclicMeasureTypes } from '../types/cyclic-measure';
import { castCyclicMeasureType } from '../utils/cast-cyclic-measure-type';

describe('castCyclicMeasureType', () => {
	test('returns the correct value for valid input', () => {
		expect(castCyclicMeasureType('Groot onderhoud')).toBe(CyclicMeasureTypes.MajorMaintenance);
		expect(castCyclicMeasureType('Dagelijksonderhoud')).toBe(CyclicMeasureTypes.DailyMaintenance);
		expect(castCyclicMeasureType('Vervangen')).toBe(CyclicMeasureTypes.ToReplace);
	});

	test('returns the default value for invalid input', () => {
		expect(castCyclicMeasureType('invalid')).toBe('invalid');
	});
});
