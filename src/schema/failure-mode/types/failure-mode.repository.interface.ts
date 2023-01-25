import { Prisma } from '@prisma/client';

import { CreateFailureModeInput } from '../dto/create-failure-mode.input';
import { UpdateFailureModeInput } from '../dto/update-failure-mode.input';

const failureModes = Prisma.validator<Prisma.failureModesArgs>()({
	select: {
		id: true,
		surveyId: true,
		elementId: true,
		unitId: true,
		manifestationId: true,
		customName: true,
		metaData: true,
		analysisRemarks: true,
		verificationRemarks: true,
		maintenanceRemarks: true,
		created_at: true,
		updated_at: true,
		defaultFailureModeId: true,
		analysisRamsR: true,
		analysisRamsA: true,
		analysisRamsS: true,
		analysisRamsC: true,
		analysisRamsEc: true,
		analysisRamsEnv: true,
		analysisRamsP: true,
		verificationRamsR: true,
		verificationRamsA: true,
		verificationRamsS: true,
		verificationRamsC: true,
		verificationRamsEc: true,
		verificationRamsEnv: true,
		verificationRamsP: true,
		maintenanceRamsR: true,
		maintenanceRamsA: true,
		maintenanceRamsS: true,
		maintenanceRamsC: true,
		maintenanceRamsEc: true,
		maintenanceRamsEnv: true,
		maintenanceRamsP: true,
		analysisRamsTotalPriority: true,
		verificationRamsTotalPriority: true,
		maintenanceRamsTotalPriority: true,
		analysisRamsWeightedPriority: true,
		verificationRamsWeightedPriority: true,
		maintenanceRamsWeightedPriority: true,
		copyOfFailureModeId: true,
		surveyScopeId: true,
		failureModeType: true,
		function: true,
		guideword: true,
		failureMode: true,
		causeOfFailure: true,
		sourceOfFailure: true,
		consequenceOfFailure: true,
		noticableFailure: true,
	},
});
export type FailureMode = Prisma.failureModesGetPayload<typeof failureModes>;

export interface IFailureModeRepository {
	// findFailureModes(surveyId: string): Promise<FailureMode[]>;
	createFailureMode(input: CreateFailureModeInput): Promise<FailureMode>;
	updateFailureMode(input: UpdateFailureModeInput): Promise<FailureMode>;
}
