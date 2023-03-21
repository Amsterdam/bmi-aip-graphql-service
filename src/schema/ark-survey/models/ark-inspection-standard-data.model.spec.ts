import { ArkInspectionStandardData } from './ark-inspection-standard-data.model';

describe('Ark/ InspectionStandardData field', () => {
	test('constructs a InspectionStandardData instance', () => {
		const InspectionStandardDataModel = new ArkInspectionStandardData();
		InspectionStandardDataModel.remarks = '__TEST__';

		expect(InspectionStandardDataModel).toBeInstanceOf(ArkInspectionStandardData);
	});
});
