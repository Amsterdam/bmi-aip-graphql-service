import { CyclicMeasure } from '../models/cyclic-measure.model';

export class CalculateCyclicMeasureCostQuery {
	public constructor(public readonly cyclicMeasure: CyclicMeasure) {}
}
