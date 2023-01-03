import { QuantityUnitOfMeasurement } from '../measure/types/measure';

import { CyclicMeasure } from './models/cyclic-measure.model';
import { CyclicMeasure as DomainCyclicMeasure } from './types/cyclic-measure.repository.interface';
import { CreateCyclicMeasureInput } from './dto/create-cyclic-measure.input';

export class CyclicMeasureFactory {
	static CreateCyclicMeasure({
		id,
		surveyId,
		maintenanceType,
		unitId,
		planYear,
		finalPlanYear,
		costSurcharge,
		remarks,
		cycle,
		unitPrice,
		quantityUnitOfMeasurement,
		defaultMaintenanceMeasureId,
		deleted_at: deletedAt,
	}: DomainCyclicMeasure): CyclicMeasure {
		const cyclicMeasure = new CyclicMeasure();
		cyclicMeasure.id = id;
		cyclicMeasure.maintenanceType = maintenanceType;
		cyclicMeasure.surveyId = surveyId;
		cyclicMeasure.unitId = unitId;
		cyclicMeasure.planYear = planYear;
		cyclicMeasure.finalPlanYear = finalPlanYear;
		cyclicMeasure.costSurcharge = costSurcharge;
		cyclicMeasure.remarks = remarks;
		cyclicMeasure.cycle = cycle;
		cyclicMeasure.unitPrice = unitPrice;
		cyclicMeasure.quantityUnitOfMeasurement = QuantityUnitOfMeasurement[quantityUnitOfMeasurement];
		cyclicMeasure.defaultMaintenanceMeasureId = defaultMaintenanceMeasureId;
		cyclicMeasure.deletedAt = deletedAt instanceof Date ? deletedAt.toUTCString() : null;
		return cyclicMeasure;
	}

	static CreateCyclicMeasureInput(unitId: string): CreateCyclicMeasureInput {
		const cyclicMeasure = new CreateCyclicMeasureInput();
		cyclicMeasure.unitId = unitId;
		return cyclicMeasure;
	}
}
