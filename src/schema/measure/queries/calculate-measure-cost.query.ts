import { Measure } from '../models/measure.model';

export class CalculateMeasureCostQuery {
	public constructor(public readonly measure: Measure) {}
}
