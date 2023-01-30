import { Prisma } from '@prisma/client';

import { FailureModeMetaData } from './models/failure-mode-meta-data.model';

export class FailureModeMetaDataFactory {
	static CreateFailureModeMetaDataFromJSONB(failureModeMetaData: Prisma.JsonValue): FailureModeMetaData {
		const failureModeMetModel = new FailureModeMetaData();
		const parsedFailureModeMetaData = failureModeMetaData as FailureModeMetaData;
		failureModeMetModel.faalOorzaak = parsedFailureModeMetaData.faalOorzaak ?? null;
		failureModeMetModel.bronVanValen = parsedFailureModeMetaData.bronVanValen ?? null;
		failureModeMetModel.gevolgVanFalen = parsedFailureModeMetaData.gevolgVanFalen ?? null;
		failureModeMetModel.faaloorzaakAnders = parsedFailureModeMetaData.faaloorzaakAnders ?? null;
		failureModeMetModel.bronVanFalenAnders = parsedFailureModeMetaData.bronVanFalenAnders ?? null;
		return failureModeMetModel;
	}
}
