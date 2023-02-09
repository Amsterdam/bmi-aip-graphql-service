/**
 * (Corrective/preventative) measures cost calculation:
 * For calculation:
 * - the unitPrice is taken from the Measure record.
 * - the quantity (always integer) is taken from the Measure record
 *
 * Cyclic measures cost calculation:
 * - the unitPrice always comes from the generated CyclicMeasure record and NOT the
 *   DefaultMaintenanceMeasure record. The unitPrice value is copied from the DefaultMaintenanceMeasure record when:
 * 		- the CyclicMeasure record is being generated for a Unit
 * 		- the DefaultMaintenanceMeasure is updated by an administrator (propagates to cyclicMeasures)
 * - the quantity (always integer) is always taken from the Unit that  the CyclicMeasure relates to (is generated for)
 */
export const calculateCost = (unitPrice: number | null, quantity: number | null): number => {
	if (!unitPrice || !quantity) return 0;
	return Number((unitPrice * quantity).toFixed(2));
};
