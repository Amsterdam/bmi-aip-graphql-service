import { calculateCost } from './calculate-cost';

describe('measures / utils / calculateCost', () => {
	test('Computes the Measure cost from quantity and unitPrice', () => {
		expect(calculateCost(1, 1)).toEqual(1);
		expect(calculateCost(1.5, 2)).toEqual(3);
		expect(calculateCost(0, 2)).toEqual(0);
		expect(calculateCost(1, 0)).toEqual(0);
		expect(calculateCost(null, 3)).toEqual(0);
		expect(calculateCost(1, null)).toEqual(0);
	});

	test('Rounds to 2 digits after comma', () => {
		expect(calculateCost(1.533, 2)).toEqual(3.07);
	});
});
