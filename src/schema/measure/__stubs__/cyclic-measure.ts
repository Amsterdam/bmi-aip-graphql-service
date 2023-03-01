import { CyclicMeasure } from '../models/cyclic-measure.model';
import { CreateCyclicMeasureInput } from '../dto/create-cyclic-measure.input';
import { CyclicMeasure as DomainCyclicMeasure } from '../types/cyclic-measure.repository.interface';
import { CyclicMeasureFactory } from '../cyclic-measure.factory';
import { UpdateCyclicMeasureInput } from '../dto/update-cyclic-measure.input';
import { CyclicMeasureTypes } from '../types/cyclic-measure';
import { QuantityUnitOfMeasurement } from '../types/measure';

const cyclicMeasure1 = new CyclicMeasure();
cyclicMeasure1.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
cyclicMeasure1.maintenanceType = CyclicMeasureTypes.MajorMaintenance;
cyclicMeasure1.unitId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
cyclicMeasure1.remarks = 'Aan de zuidzijde';

const cyclicMeasure2 = new CyclicMeasure();
cyclicMeasure2.id = '6d79f740-186d-4197-888e-3384fcb8cb6a';
cyclicMeasure2.maintenanceType = CyclicMeasureTypes.MajorMaintenance;
cyclicMeasure2.unitId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';
cyclicMeasure2.remarks = 'Kabel';

export { cyclicMeasure1, cyclicMeasure2 };

const cyclicMeasureRaw: Omit<DomainCyclicMeasure, 'id'> = {
	surveyId: '68a95a2c-b909-e77f-4d66-9fd5afef5adb',
	unitId: '68a95a2c-b909-e77f-4d66-9fd5afef5afb',
	maintenanceType: CyclicMeasureTypes.DailyMaintenance,
	defaultMaintenanceMeasureId: '68a95a2c-b909-e77f-4d66-9fd5afef5af3',
	planYear: 2010,
	finalPlanYear: 2010,
	costSurcharge: 7.3,
	remarks: '__REMARKS__',
	cycle: 2.3,
	unitPrice: 33.99,
	quantityUnitOfMeasurement: QuantityUnitOfMeasurement.m2,
	failureModeId: '',
	defectId: '',
	deleted_at: null,
};

export const cyclicMeasureInput = Object.keys(cyclicMeasureRaw).reduce((input, key) => {
	input[key] = cyclicMeasureRaw[key];
	return input;
}, new CreateCyclicMeasureInput());

const updateCyclicMeasure = new UpdateCyclicMeasureInput();
updateCyclicMeasure.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
export const updateCyclicMeasureInput = Object.keys(cyclicMeasureRaw).reduce((input, key) => {
	input[key] = cyclicMeasureRaw[key];
	return input;
}, updateCyclicMeasure);

export const domainCyclicMeasure: DomainCyclicMeasure = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	...cyclicMeasureRaw,
	maintenanceType: null,
	defaultMaintenanceMeasureId: null,
	planYear: null,
	finalPlanYear: null,
	deleted_at: null,
};

export const cyclicMeasure = CyclicMeasureFactory.CreateCyclicMeasure(domainCyclicMeasure);

export const deletedCyclicMeasure: DomainCyclicMeasure = {
	...domainCyclicMeasure,
	deleted_at: new Date('Thu, 09 Jun 2022 15:03:22 GMT'),
};
