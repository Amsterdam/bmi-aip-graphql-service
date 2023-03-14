import { Prisma } from '@prisma/client';

import { FailureModeMetaData } from './models/failure-mode-meta-data.model';
import { FailureModeMetaDataInput } from './dto/failure-mode-meta-data.input';

export class FailureModeMetaDataFactory {
	static CreateFailureModeMetaDataFromJSONB(failureModeMetaData: Prisma.JsonValue): FailureModeMetaData {
		// Can be null
		if (!failureModeMetaData) {
			return null;
		}

		const failureModeMetModel = new FailureModeMetaData();
		const parsedFailureModeMetaData = failureModeMetaData as FailureModeMetaDataInput;
		failureModeMetModel.failureCause = parsedFailureModeMetaData?.Faaloorzaak ?? '';
		failureModeMetModel.sourceOfFailure = parsedFailureModeMetaData?.['Bron van falen'] ?? '';
		failureModeMetModel.consequenceOfFailure = parsedFailureModeMetaData?.['Gevolg van falen'] ?? '';
		failureModeMetModel.causeOfFailureOther = parsedFailureModeMetaData?.['Faaloorzaak anders'] ?? '';
		failureModeMetModel.sourceOfFailureOther = parsedFailureModeMetaData?.['Bron van falen anders'] ?? '';
		return failureModeMetModel;
	}
}
