import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { calculateCost } from '../utils';

import { CalculateMeasureCostQuery } from './calculate-measure-cost.query';

@QueryHandler(CalculateMeasureCostQuery)
export class CalculateMeasureCostHandler implements IQueryHandler<CalculateMeasureCostQuery> {
	async execute({ measure }: CalculateMeasureCostQuery): Promise<number> {
		const { unitPrice, quantity } = measure;
		return calculateCost(unitPrice, quantity);
	}
}
