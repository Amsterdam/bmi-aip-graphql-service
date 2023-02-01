import { FailureMode } from '../models/failure-mode.model';

describe('Model / FailureMode', () => {
	test('constructs an failureMode instance object', () => {
		const failureMode = new FailureMode();
		failureMode.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
		failureMode.surveyId = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
		failureMode.elementId = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
		failureMode.unitId = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
		failureMode.manifestationId = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
		failureMode.customName = 'customName';
		failureMode.metaData = null;
		failureMode.analysisRemarks = null;
		failureMode.verificationRemarks = null;
		failureMode.maintenanceRemarks = null;
		failureMode.defaultFailureModeId = null;
		failureMode.analysisRamsR = null;
		failureMode.analysisRamsA = null;
		failureMode.analysisRamsS = null;
		failureMode.analysisRamsC = null;
		failureMode.analysisRamsEc = null;
		failureMode.analysisRamsEnv = null;
		failureMode.analysisRamsP = null;
		failureMode.verificationRamsR = null;
		failureMode.verificationRamsA = null;
		failureMode.verificationRamsS = null;
		failureMode.verificationRamsC = null;
		failureMode.verificationRamsEc = null;
		failureMode.verificationRamsEnv = null;
		failureMode.verificationRamsP = null;
		failureMode.maintenanceRamsR = null;
		failureMode.maintenanceRamsA = null;
		failureMode.maintenanceRamsS = null;
		failureMode.maintenanceRamsC = null;
		failureMode.maintenanceRamsEc = null;
		failureMode.maintenanceRamsEnv = null;
		failureMode.maintenanceRamsP = null;
		failureMode.analysisRamsTotalPriority = null;
		failureMode.verificationRamsTotalPriority = null;
		failureMode.maintenanceRamsTotalPriority = null;
		failureMode.analysisRamsWeightedPriority = null;
		failureMode.verificationRamsWeightedPriority = null;
		failureMode.maintenanceRamsWeightedPriority = null;
		failureMode.copyOfFailureModeId = null;
		failureMode.surveyScopeId = null;
		failureMode.failureModeType = null;
		failureMode.purpose = null;
		failureMode.guideword = null;
		failureMode.failureMode = null;
		failureMode.causeOfFailure = null;
		failureMode.sourceOfFailure = null;
		failureMode.consequenceOfFailure = null;
		failureMode.noticableFailure = null;

		expect(failureMode).toBeInstanceOf(FailureMode);
		expect(failureMode).toEqual({
			id: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
			surveyId: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
			elementId: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
			unitId: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
			manifestationId: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
			customName: 'customName',
			metaData: null,
			analysisRemarks: null,
			verificationRemarks: null,
			maintenanceRemarks: null,
			defaultFailureModeId: null,
			analysisRamsR: null,
			analysisRamsA: null,
			analysisRamsS: null,
			analysisRamsC: null,
			analysisRamsEc: null,
			analysisRamsEnv: null,
			analysisRamsP: null,
			verificationRamsR: null,
			verificationRamsA: null,
			verificationRamsS: null,
			verificationRamsC: null,
			verificationRamsEc: null,
			verificationRamsEnv: null,
			verificationRamsP: null,
			maintenanceRamsR: null,
			maintenanceRamsA: null,
			maintenanceRamsS: null,
			maintenanceRamsC: null,
			maintenanceRamsEc: null,
			maintenanceRamsEnv: null,
			maintenanceRamsP: null,
			analysisRamsTotalPriority: null,
			verificationRamsTotalPriority: null,
			maintenanceRamsTotalPriority: null,
			analysisRamsWeightedPriority: null,
			verificationRamsWeightedPriority: null,
			maintenanceRamsWeightedPriority: null,
			copyOfFailureModeId: null,
			surveyScopeId: null,
			failureModeType: null,
			purpose: null,
			guideword: null,
			failureMode: null,
			causeOfFailure: null,
			sourceOfFailure: null,
			consequenceOfFailure: null,
			noticableFailure: null,
		});
	});
});
