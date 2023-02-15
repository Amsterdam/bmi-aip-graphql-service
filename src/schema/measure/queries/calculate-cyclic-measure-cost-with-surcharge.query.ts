import { CyclicMeasure } from '../models/cyclic-measure.model';

export class CalculateCyclicMeasureCostWithSurchargeQuery {
	public constructor(public readonly cyclicMeasure: CyclicMeasure) {}
}
