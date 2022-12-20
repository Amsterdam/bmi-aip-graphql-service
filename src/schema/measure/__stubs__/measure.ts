import { Measure } from '../models/measure.model';
import { CreateMeasureInput } from '../dto/create-measure.input';
import { Measure as DomainMeasure } from '../types/measure.repository.interface';
import { MeasureFactory } from '../measure.factory';
import { UpdateMeasureInput } from '../dto/update-measure.input';

const measure1 = new Measure();
measure1.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
measure1.maintenanceType = 'Correctief onderhoud';
measure1.unitId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
measure1.location = 'Gehele brug';
measure1.description = 'Herstellen corrosieschade paal';

const measure2 = new Measure();
measure2.id = '6d79f740-186d-4197-888e-3384fcb8cb6a';
measure2.maintenanceType = 'Preventief onderhoud';
measure2.unitId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
measure2.location = 'Gehele brug';
measure2.description = 'Conservering overlagen paal (staal)';

export { measure1, measure2 };

const measureRaw: Omit<DomainMeasure, 'id'> = {
	unitId: '68a95a2c-b909-e77f-4d66-9fd5afef5afb',
	maintenanceType: '__MAINTENANCETYPE__',
	planYear: 2010,
	finalPlanYear: 2010,
	costSurcharge: 7.3,
	location: '__LOCATION__',
	description: '__DESCTIPTION__',
	quantity: 20,
	unitPrice: 33.99,
	quantityUnitOfMeasurement: '',
	manifestationId: '',
	failureModeId: '',
	defectId: '',
	surveyScopeId: '',
	deleted_at: null,
};

export const measureInput = Object.keys(measureRaw).reduce((input, key) => {
	input[key] = measureRaw[key];
	return input;
}, new CreateMeasureInput());

const updateMeasure = new UpdateMeasureInput();
updateMeasure.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
export const updateMeasureInput = Object.keys(measureRaw).reduce((input, key) => {
	input[key] = measureRaw[key];
	return input;
}, updateMeasure);

export const domainMeasure: DomainMeasure = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	...measureRaw,
	deleted_at: null,
};

export const measure = MeasureFactory.CreateMeasure(domainMeasure);

export const deletedMeasure: DomainMeasure = {
	...domainMeasure,
	deleted_at: new Date('Thu, 09 Jun 2022 15:03:22 GMT'),
};
