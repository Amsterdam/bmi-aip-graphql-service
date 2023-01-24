import { FailureMode } from './models/failure-mode.model';
import { FailureMode as DomainFailureMode } from './types/failure-mode.repository.interface';
import { CreateFailureModeInput } from './dto/create-failure-mode.input';

export class FailureModeFactory {
	static CreateFailureMode({
		id,
		surveyId,
		elementId,
		unitId,
		manifestationId,
		customName,
		metaData,
		analysisRemarks,
		verificationRemarks,
		maintenanceRemarks,
		defaultFailureModeId,
		analysisRamsR,
		analysisRamsA,
		analysisRamsS,
		analysisRamsC,
		analysisRamsEc,
		analysisRamsEnv,
		analysisRamsP,
		verificationRamsR,
		verificationRamsA,
		verificationRamsS,
		verificationRamsC,
		verificationRamsEc,
		verificationRamsEnv,
		verificationRamsP,
		maintenanceRamsR,
		maintenanceRamsA,
		maintenanceRamsS,
		maintenanceRamsC,
		maintenanceRamsEc,
		maintenanceRamsEnv,
		maintenanceRamsP,
		analysisRamsTotalPriority,
		verificationRamsTotalPriority,
		maintenanceRamsTotalPriority,
		analysisRamsWeightedPriority,
		verificationRamsWeightedPriority,
		maintenanceRamsWeightedPriority,
		copyOfFailureModeId,
		surveyScopeId,
		failureModeType,
		// function,
		guideword,
		// failureMode,
		causeOfFailure,
		sourceOfFailure,
		consequenceOfFailure,
		noticableFailure,
	}: DomainFailureMode): FailureMode {
		const failureMode = new FailureMode();
		failureMode.id = id;
		failureMode.surveyId = surveyId;
		failureMode.elementId = elementId;
		failureMode.unitId = unitId;
		failureMode.manifestationId = manifestationId;
		failureMode.customName = customName;
		failureMode.metaData = metaData;
		failureMode.analysisRemarks = analysisRemarks;
		failureMode.verificationRemarks = verificationRemarks;
		failureMode.maintenanceRemarks = maintenanceRemarks;
		failureMode.defaultFailureModeId = defaultFailureModeId;
		failureMode.analysisRamsR = analysisRamsR;
		failureMode.analysisRamsA = analysisRamsA;
		failureMode.analysisRamsS = analysisRamsS;
		failureMode.analysisRamsC = analysisRamsC;
		failureMode.analysisRamsEc = analysisRamsEc;
		failureMode.analysisRamsEnv = analysisRamsEnv;
		failureMode.analysisRamsP = analysisRamsP;
		failureMode.verificationRamsR = verificationRamsR;
		failureMode.verificationRamsA = verificationRamsA;
		failureMode.verificationRamsS = verificationRamsS;
		failureMode.verificationRamsC = verificationRamsC;
		failureMode.verificationRamsEc = verificationRamsEc;
		failureMode.verificationRamsEnv = verificationRamsEnv;
		failureMode.verificationRamsP = verificationRamsP;
		failureMode.maintenanceRamsR = maintenanceRamsR;
		failureMode.maintenanceRamsA = maintenanceRamsA;
		failureMode.maintenanceRamsS = maintenanceRamsS;
		failureMode.maintenanceRamsC = maintenanceRamsC;
		failureMode.maintenanceRamsEc = maintenanceRamsEc;
		failureMode.maintenanceRamsEnv = maintenanceRamsEnv;
		failureMode.maintenanceRamsP = maintenanceRamsP;
		failureMode.analysisRamsTotalPriority = analysisRamsTotalPriority;
		failureMode.verificationRamsTotalPriority = verificationRamsTotalPriority;
		failureMode.maintenanceRamsTotalPriority = maintenanceRamsTotalPriority;
		failureMode.analysisRamsWeightedPriority = analysisRamsWeightedPriority;
		failureMode.verificationRamsWeightedPriority = verificationRamsWeightedPriority;
		failureMode.maintenanceRamsWeightedPriority = maintenanceRamsWeightedPriority;
		failureMode.copyOfFailureModeId = copyOfFailureModeId;
		failureMode.surveyScopeId = surveyScopeId;
		failureMode.failureModeType = failureModeType;
		// failureMode.function = function;
		failureMode.guideword = guideword;
		// failureMode.failureMode = failureMode;
		failureMode.causeOfFailure = causeOfFailure;
		failureMode.sourceOfFailure = sourceOfFailure;
		failureMode.consequenceOfFailure = consequenceOfFailure;
		failureMode.noticableFailure = noticableFailure;
		return failureMode;
	}

	static CreateFailureModeInput(unitId: string): CreateFailureModeInput {
		const failureMode = new CreateFailureModeInput();
		failureMode.unitId = unitId;
		return failureMode;
	}
}
