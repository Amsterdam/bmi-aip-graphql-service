import { InspectionStandardData } from './inspection-standard-data.model';

describe('InspectionStandardData field', () => {
	test('constructs a InspectionStandardData instance', () => {
		const InspectionStandardDataModel = new InspectionStandardData();
		InspectionStandardDataModel.remarks = '__TEST__';

		expect(InspectionStandardDataModel).toBeInstanceOf(InspectionStandardData);
	});
});
