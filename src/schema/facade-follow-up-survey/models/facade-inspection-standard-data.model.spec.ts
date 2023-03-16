import { FacadeInspectionStandardData } from './facade-inspection-standard-data.model';

describe('Facade/ InspectionStandardData field', () => {
	test('constructs a InspectionStandardData instance', () => {
		const InspectionStandardDataModel = new FacadeInspectionStandardData();
		InspectionStandardDataModel.remarks = '__TEST__';

		expect(InspectionStandardDataModel).toBeInstanceOf(FacadeInspectionStandardData);
	});
});
