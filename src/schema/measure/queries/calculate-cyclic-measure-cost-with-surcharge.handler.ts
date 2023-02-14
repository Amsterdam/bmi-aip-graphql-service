import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

import { calculateCostWithSurcharge } from '../utils';
import { CyclicMeasure } from '../models/cyclic-measure.model';
import { UnitService } from '../../decomposition/unit.service';

import { CalculateCyclicMeasureCostWithSurchargeQuery } from './calculate-cyclic-measure-cost-with-surcharge.query';

@Injectable()
@QueryHandler(CalculateCyclicMeasureCostWithSurchargeQuery)
export class CalculateCyclicMeasureCostWithSurchargeHandler
	implements IQueryHandler<CalculateCyclicMeasureCostWithSurchargeQuery>
{
	constructor(private readonly unitService: UnitService) {}

	async execute({ cyclicMeasure }: CalculateCyclicMeasureCostWithSurchargeQuery): Promise<CyclicMeasure> {
		const { unitPrice, costSurcharge, unitId } = cyclicMeasure;
		const { quantity } = await this.unitService.getUnitById(unitId);
		cyclicMeasure.costWithSurcharge = calculateCostWithSurcharge(unitPrice, quantity, costSurcharge);
		return cyclicMeasure;
	}
}
