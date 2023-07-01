import { SpanMeasuresInspectionStandardData } from './span-measures-inspection-standard-data.model';

describe('Span Measures/ InspectionStandardData field', () => {
	test('constructs a InspectionStandardData instance', () => {
		const InspectionStandardDataModel = new SpanMeasuresInspectionStandardData();
		InspectionStandardDataModel.generalRemarks = '__TEST__';
		InspectionStandardDataModel.completionRemarks = '__TEST__';

		expect(InspectionStandardDataModel).toBeInstanceOf(SpanMeasuresInspectionStandardData);
	});
});
