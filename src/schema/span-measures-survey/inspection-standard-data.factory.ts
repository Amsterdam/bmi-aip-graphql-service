import { Prisma } from '.prisma/client';

import { InspectionStandardData } from './models/inspection-standard-data.models';

export class InspectionStandardDataFactory {
	static CreateInspectionStandardDataFromJSONB(inspectionStandardData: Prisma.JsonValue): InspectionStandardData {
		const inspectionStandardDataModel = new InspectionStandardData();
		const parsedinspectionStandardData = inspectionStandardData as InspectionStandardData;

		inspectionStandardDataModel.generalRemarks = parsedinspectionStandardData?.generalRemarks;

		return inspectionStandardDataModel;
	}
}
