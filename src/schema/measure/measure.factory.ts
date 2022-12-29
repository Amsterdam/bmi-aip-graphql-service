import { Measure } from './models/measure.model';
import { Measure as DomainMeasure } from './types/measure.repository.interface';
import { CreateMeasureInput } from './dto/create-measure.input';
import { QuantityUnitOfMeasurement } from './types/measure';

export class MeasureFactory {
	static CreateMeasure({
		id,
		maintenanceType,
		unitId,
		planYear,
		finalPlanYear,
		costSurcharge,
		description,
		location,
		unitPrice,
		quantityUnitOfMeasurement,
		quantity,
		defectId,
		manifestationId,
		surveyScopeId,
		failureModeId,
		deleted_at: deletedAt,
	}: DomainMeasure): Measure {
		const measure = new Measure();
		measure.id = id;
		measure.maintenanceType = maintenanceType;
		measure.unitId = unitId;
		measure.planYear = planYear;
		measure.finalPlanYear = finalPlanYear;
		measure.costSurcharge = costSurcharge;
		measure.description = description;
		measure.location = location;
		measure.unitPrice = unitPrice;
		measure.quantity = quantity;
		measure.quantityUnitOfMeasurement = QuantityUnitOfMeasurement[quantityUnitOfMeasurement];
		measure.surveyScopeId = surveyScopeId;
		measure.failureModeId = failureModeId;
		measure.defectId = defectId;
		measure.manifestationId = manifestationId;
		measure.deletedAt = deletedAt instanceof Date ? deletedAt.toUTCString() : null;
		return measure;
	}

	static CreateMeasureInput(unitId: string): CreateMeasureInput {
		const measure = new CreateMeasureInput();
		measure.unitId = unitId;
		return measure;
	}
}
