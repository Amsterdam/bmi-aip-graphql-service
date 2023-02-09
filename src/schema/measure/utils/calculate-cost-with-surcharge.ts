/**
 * (Corrective/preventative) measures cost calculation:
 * For calculation:
 * - the unitPrice is taken from the Measure record.
 * - the quantity is taken from the Measure record
 *
 * Cyclic measures cost calculation:
 * - the unitPrice always comes from the generated CyclicMeasure record and NOT the
 *   DefaultMaintenanceMeasure record. The unitPrice value is copied from the DefaultMaintenanceMeasure record when:
 * 		- the CyclicMeasure record is being generated for a Unit
 * 		- the DefaultMaintenanceMeasure is updated by an administrator (propagates to cyclicMeasures)
 * - the quantity is always taken from the Unit that  the CyclicMeasure relates to (is generated for)
 */
export const calculateCostWithSurcharge = (unitPrice: number, quantity: number, costSurcharge: number): number => {
	if (!unitPrice || !quantity) return 0;
	return Number((unitPrice * quantity * costSurcharge).toFixed(2));
};
