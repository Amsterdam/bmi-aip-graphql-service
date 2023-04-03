import { Prisma } from '@prisma/client';

import { FailureModeMetaData } from './models/failure-mode-meta-data.model';

export class FailureModeMetaDataFactory {
	static CreateFailureModeMetaDataFromJSONB(failureModeMetaData: Prisma.JsonValue): FailureModeMetaData {
		// Can be null
		if (!failureModeMetaData) {
			return null;
		}

		const failureModeMetModel = new FailureModeMetaData();

		// eslint-disable-next-line
		failureModeMetModel.failureCause = failureModeMetaData?.['Faaloorzaak'] ?? '';
		failureModeMetModel.sourceOfFailure = failureModeMetaData?.['Bron van falen'] ?? '';
		failureModeMetModel.consequenceOfFailure = failureModeMetaData?.['Gevolg van falen'] ?? '';
		failureModeMetModel.causeOfFailureOther = failureModeMetaData?.['Faaloorzaak anders'] ?? '';
		failureModeMetModel.sourceOfFailureOther = failureModeMetaData?.['Bron van falen anders'] ?? '';
		return failureModeMetModel;
	}
}
