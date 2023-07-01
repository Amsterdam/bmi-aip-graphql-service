import { Prisma } from '.prisma/client';

import { SpanMeasuresInspectionStandardData } from './models/span-measures-inspection-standard-data.model';

export class InspectionStandardDataFactory {
	static CreateInspectionStandardDataFromJSONB(
		inspectionStandardData: Prisma.JsonValue,
	): SpanMeasuresInspectionStandardData {
		const inspectionStandardDataModel = new SpanMeasuresInspectionStandardData();
		const parsedinspectionStandardData = inspectionStandardData as SpanMeasuresInspectionStandardData;

		inspectionStandardDataModel.generalRemarks = parsedinspectionStandardData?.generalRemarks;
		inspectionStandardDataModel.completionRemarks = parsedinspectionStandardData?.completionRemarks;

		return inspectionStandardDataModel;
	}
}
