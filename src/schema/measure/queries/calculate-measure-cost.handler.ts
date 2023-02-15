import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { calculateCost } from '../utils';
import { Measure } from '../models/measure.model';

import { CalculateMeasureCostQuery } from './calculate-measure-cost.query';

@QueryHandler(CalculateMeasureCostQuery)
export class CalculateMeasureCostHandler implements IQueryHandler<CalculateMeasureCostQuery> {
	async execute({ measure }: CalculateMeasureCostQuery): Promise<Measure> {
		const { unitPrice, quantity } = measure;
		measure.cost = calculateCost(unitPrice, quantity);
		return measure;
	}
}
