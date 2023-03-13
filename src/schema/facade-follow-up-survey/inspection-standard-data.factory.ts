import { Prisma } from '.prisma/client';

import { InspectionStandardData } from './models/inspection-standard-data.model';

export class InspectionStandardDataFactory {
	static createInspectionStandardDataFromJSONB(inspectionStandardData: Prisma.JsonValue): InspectionStandardData {
		const inspectionStandardDataModel = new InspectionStandardData();
		const parsedinspectionStandardData = inspectionStandardData as InspectionStandardData;

		inspectionStandardDataModel.remarks = parsedinspectionStandardData?.remarks;

		return inspectionStandardDataModel;
	}
}
