import { calculateCostWithSurcharge } from './calculate-cost-with-surcharge';

describe('measures / utils / calculateCostWithSurcharge', () => {
	test('Computes the Measure cost from quantity and unitPrice', () => {
		expect(calculateCostWithSurcharge(1, 1, 1)).toEqual(1);
		expect(calculateCostWithSurcharge(1.5, 2, 1.1)).toEqual(3.3);
		expect(calculateCostWithSurcharge(0, 2, 1.2)).toEqual(0);
		expect(calculateCostWithSurcharge(1, 0, 1.1)).toEqual(0);
		expect(calculateCostWithSurcharge(null, 3, 1)).toEqual(0);
		expect(calculateCostWithSurcharge(1, null, 1)).toEqual(0);
		expect(calculateCostWithSurcharge(1, 1, null)).toEqual(0);
	});

	test('Rounds to 2 digits after comma', () => {
		expect(calculateCostWithSurcharge(1.533, 2.333, 1.1)).toEqual(3.93);
	});
});
