import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

import { calculateCost } from '../utils';
import { UnitService } from '../../decomposition/unit.service';

import { CalculateCyclicMeasureCostQuery } from './calculate-cyclic-measure-cost.query';

@Injectable()
@QueryHandler(CalculateCyclicMeasureCostQuery)
export class CalculateCyclicMeasureCostHandler implements IQueryHandler<CalculateCyclicMeasureCostQuery> {
	constructor(private readonly unitService: UnitService) {}

	async execute({ cyclicMeasure }: CalculateCyclicMeasureCostQuery): Promise<number> {
		const { unitPrice, unitId } = cyclicMeasure;
		const { quantity } = await this.unitService.getUnitById(unitId);
		return calculateCost(unitPrice, quantity);
	}
}
