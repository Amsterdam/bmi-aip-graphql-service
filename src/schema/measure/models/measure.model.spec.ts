import { Measure } from './measure.model';

describe('Model / Measure', () => {
	test('constructs an Measure instance object', () => {
		const measure = new Measure();
		measure.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
		measure.maintenanceType = '';
		measure.unitId = '';
		measure.planYear = 2000;
		measure.finalPlanYear = 2000;
		measure.costSurcharge = 7.3;
		measure.description = '';
		measure.location = '';
		measure.quantity = 20;
		measure.unitPrice = 33.99;
		measure.quantityUnitOfMeasurement = '';
		measure.manifestationId = '';
		measure.failureModeId = '';
		measure.defectId = '';
		measure.surveyScopeId = '';

		expect(measure).toBeInstanceOf(Measure);
		expect(measure).toEqual({
			id: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
			maintenanceType: '',
			unitId: '',
			planYear: 2000,
			finalPlanYear: 2000,
			costSurcharge: 7.3,
			description: '',
			location: '',
			quantity: 20,
			unitPrice: 33.99,
			quantityUnitOfMeasurement: '',
			manifestationId: '',
			failureModeId: '',
			defectId: '',
			surveyScopeId: '',
		});
	});
});
