import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { calculateCostWithSurcharge } from '../utils';

import { CalculateMeasureCostWithSurchargeQuery } from './calculate-measure-cost-with-surcharge.query';

@QueryHandler(CalculateMeasureCostWithSurchargeQuery)
export class CalculateMeasureCostWithSurchargeHandler implements IQueryHandler<CalculateMeasureCostWithSurchargeQuery> {
	async execute({ measure }: CalculateMeasureCostWithSurchargeQuery): Promise<number> {
		const { unitPrice, quantity, costSurcharge } = measure;
		return calculateCostWithSurcharge(unitPrice, quantity, costSurcharge);
	}
}
