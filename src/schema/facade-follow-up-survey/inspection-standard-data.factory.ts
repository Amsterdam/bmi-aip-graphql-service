import { Prisma } from '.prisma/client';

import { FacadeInspectionStandardData } from './models/facade-inspection-standard-data.model';

export class InspectionStandardDataFactory {
	static CreateInspectionStandardDataFromJSONB(
		inspectionStandardData: Prisma.JsonValue,
	): FacadeInspectionStandardData {
		const inspectionStandardDataModel = new FacadeInspectionStandardData();
		const parsedinspectionStandardData = inspectionStandardData as FacadeInspectionStandardData;

		inspectionStandardDataModel.remarks = parsedinspectionStandardData?.remarks;

		return inspectionStandardDataModel;
	}
}
