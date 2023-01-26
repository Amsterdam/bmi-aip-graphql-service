import { Condition } from '../models/condition.model';

describe('Model / Condition', () => {
	test('constructs an Condition instance object', () => {
		const condition = new Condition();
		condition.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
		condition.maintenanceType = '';
		condition.unitId = '';
		condition.planYear = 2000;
		condition.finalPlanYear = 2000;
		condition.costSurcharge = 7.3;
		condition.description = '';
		condition.location = '';
		condition.quantity = 20;
		condition.unitPrice = 33.99;
		condition.quantityUnitOfConditionment = '';
		condition.manifestationId = '';
		condition.failureModeId = '';
		condition.defectId = '';
		condition.surveyScopeId = '';

		expect(condition).toBeInstanceOf(Condition);
		expect(condition).toEqual({
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
			quantityUnitOfConditionment: '',
			manifestationId: '',
			failureModeId: '',
			defectId: '',
			surveyScopeId: '',
		});
	});
});
