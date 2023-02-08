import { DefaultMaintenanceMeasure } from '../models/default-maintenance-measure.model';
import { DefaultMaintenanceMeasure as DomainDefaultMaintenanceMeasure } from '../types/default-maintenance-measure.repository.interface';
import { DefaultMaintenanceMeasureFactory } from '../default-maintenance-measure.factory';

const defaultMaintenanceMeasure1 = new DefaultMaintenanceMeasure();
defaultMaintenanceMeasure1.id = '842cbc36-c28a-5066-c669-6a32af707576';
defaultMaintenanceMeasure1.description = 'Grote revisie hydraulische aandrijving complex';
defaultMaintenanceMeasure1.objectTypeUnitCodeId = '';
defaultMaintenanceMeasure1.material = '';
defaultMaintenanceMeasure1.cycle = 0;
defaultMaintenanceMeasure1.maintenanceType = '';
defaultMaintenanceMeasure1.quantityUnitOfMeasurement = '';
defaultMaintenanceMeasure1.unitPrice = 0;

export { defaultMaintenanceMeasure1 };

const defaultMaintenanceMeasureRaw: Omit<DomainDefaultMaintenanceMeasure, 'id'> = {
	description: 'Grote revisie hydraulische aandrijving complex',
	objectTypeUnitCodeId: '',
	material: '',
	cycle: 0,
	maintenanceType: '',
	quantityUnitOfMeasurement: '',
	unitPrice: 0,
	created_at: undefined,
	updated_at: undefined,
};

export const domainDefaultMaintenanceMeasure: DomainDefaultMaintenanceMeasure = {
	id: '842cbc36-c28a-5066-c669-6a32af707576',
	...defaultMaintenanceMeasureRaw,
};

export const defaultMaintenanceMeasure = DefaultMaintenanceMeasureFactory.CreateDefaultMaintenanceMeasure(
	domainDefaultMaintenanceMeasure,
);
