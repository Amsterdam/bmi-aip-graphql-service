import { Measure } from '../models/measure.model';

export class CalculateMeasureCostWithSurchargeQuery {
	public constructor(public readonly measure: Measure) {}
}
