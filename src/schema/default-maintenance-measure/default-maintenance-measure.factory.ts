import { DefaultMaintenanceMeasure } from './models/default-maintenance-measure.model';
import { DefaultMaintenanceMeasure as DomainDefaultMaintenanceMeasure } from './types/default-maintenance-measure.repository.interface';

export class DefaultMaintenanceMeasureFactory {
	static CreateDefaultMaintenanceMeasure({
		id,
		description,
		objectTypeUnitCodeId,
		material,
		cycle,
		maintenanceType,
		quantityUnitOfMeasurement,
		unitPrice,
		created_at: createdAt,
		updated_at: updatedAt,
	}: DomainDefaultMaintenanceMeasure): DefaultMaintenanceMeasure {
		const defaultMaintenanceMeasure = new DefaultMaintenanceMeasure();
		defaultMaintenanceMeasure.id = id;
		defaultMaintenanceMeasure.description = description;
		defaultMaintenanceMeasure.objectTypeUnitCodeId = objectTypeUnitCodeId;
		defaultMaintenanceMeasure.material = material;
		defaultMaintenanceMeasure.cycle = cycle;
		defaultMaintenanceMeasure.maintenanceType = maintenanceType;
		defaultMaintenanceMeasure.quantityUnitOfMeasurement = quantityUnitOfMeasurement;
		defaultMaintenanceMeasure.unitPrice = unitPrice;
		defaultMaintenanceMeasure.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		defaultMaintenanceMeasure.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;

		return defaultMaintenanceMeasure;
	}
}
