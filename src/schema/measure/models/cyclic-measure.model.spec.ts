import { CyclicMeasure } from './cyclic-measure.model';

describe('Model / CyclicMeasure', () => {
	test('constructs an CyclicMeasure instance object', () => {
		const cyclicMeasure = new CyclicMeasure();
		cyclicMeasure.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
		cyclicMeasure.maintenanceType = '';
		cyclicMeasure.unitId = '';
		cyclicMeasure.planYear = 2000;
		cyclicMeasure.finalPlanYear = 2000;
		cyclicMeasure.costSurcharge = 7.3;
		cyclicMeasure.remarks = '';
		cyclicMeasure.cycle = 2.3;
		cyclicMeasure.unitPrice = 33.99;
		cyclicMeasure.quantityUnitOfMeasurement = '';

		expect(cyclicMeasure).toBeInstanceOf(CyclicMeasure);
		expect(cyclicMeasure).toEqual({
			id: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
			maintenanceType: '',
			unitId: '',
			planYear: 2000,
			finalPlanYear: 2000,
			costSurcharge: 7.3,
			remarks: '',
			cycle: 2.3,
			unitPrice: 33.99,
			quantityUnitOfMeasurement: '',
		});
	});
});
