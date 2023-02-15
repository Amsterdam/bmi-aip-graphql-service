import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { calculateCostWithSurcharge } from '../utils';
import { Measure } from '../models/measure.model';

import { CalculateMeasureCostWithSurchargeQuery } from './calculate-measure-cost-with-surcharge.query';

@QueryHandler(CalculateMeasureCostWithSurchargeQuery)
export class CalculateMeasureCostWithSurchargeHandler implements IQueryHandler<CalculateMeasureCostWithSurchargeQuery> {
	async execute({ measure }: CalculateMeasureCostWithSurchargeQuery): Promise<Measure> {
		const { unitPrice, quantity, costSurcharge } = measure;
		measure.costWithSurcharge = calculateCostWithSurcharge(unitPrice, quantity, costSurcharge);
		return measure;
	}
}
