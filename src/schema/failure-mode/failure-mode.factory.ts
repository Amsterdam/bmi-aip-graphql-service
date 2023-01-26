import { FailureMode } from './models/failure-mode.model';
import { FailureMode as DomainFailureMode } from './types/failure-mode.repository.interface';
import { CreateFailureModeInput } from './dto/create-failure-mode.input';
import { FailureModeMetaDataFactory } from './failure-mode-meta-data.factory';

export class FailureModeFactory {
	static CreateFailureMode(failureMode: DomainFailureMode): FailureMode {
		const {
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
			guideword,
			causeOfFailure,
			sourceOfFailure,
			consequenceOfFailure,
			noticableFailure,
			created_at: createdAt,
			updated_at: updatedAt,
		} = failureMode;
		const fMode = new FailureMode();
		fMode.id = id;
		fMode.surveyId = surveyId;
		fMode.elementId = elementId;
		fMode.unitId = unitId;
		fMode.manifestationId = manifestationId;
		fMode.customName = customName;
		fMode.metaData = FailureModeMetaDataFactory.CreateFailureModeMetaDataFromJSONB(metaData as string);
		fMode.analysisRemarks = analysisRemarks;
		fMode.verificationRemarks = verificationRemarks;
		fMode.maintenanceRemarks = maintenanceRemarks;
		fMode.defaultFailureModeId = defaultFailureModeId;
		fMode.analysisRamsR = analysisRamsR;
		fMode.analysisRamsA = analysisRamsA;
		fMode.analysisRamsS = analysisRamsS;
		fMode.analysisRamsC = analysisRamsC;
		fMode.analysisRamsEc = analysisRamsEc;
		fMode.analysisRamsEnv = analysisRamsEnv;
		fMode.analysisRamsP = analysisRamsP;
		fMode.verificationRamsR = verificationRamsR;
		fMode.verificationRamsA = verificationRamsA;
		fMode.verificationRamsS = verificationRamsS;
		fMode.verificationRamsC = verificationRamsC;
		fMode.verificationRamsEc = verificationRamsEc;
		fMode.verificationRamsEnv = verificationRamsEnv;
		fMode.verificationRamsP = verificationRamsP;
		fMode.maintenanceRamsR = maintenanceRamsR;
		fMode.maintenanceRamsA = maintenanceRamsA;
		fMode.maintenanceRamsS = maintenanceRamsS;
		fMode.maintenanceRamsC = maintenanceRamsC;
		fMode.maintenanceRamsEc = maintenanceRamsEc;
		fMode.maintenanceRamsEnv = maintenanceRamsEnv;
		fMode.maintenanceRamsP = maintenanceRamsP;
		fMode.analysisRamsTotalPriority = analysisRamsTotalPriority;
		fMode.verificationRamsTotalPriority = verificationRamsTotalPriority;
		fMode.maintenanceRamsTotalPriority = maintenanceRamsTotalPriority;
		fMode.analysisRamsWeightedPriority = analysisRamsWeightedPriority;
		fMode.verificationRamsWeightedPriority = verificationRamsWeightedPriority;
		fMode.maintenanceRamsWeightedPriority = maintenanceRamsWeightedPriority;
		fMode.copyOfFailureModeId = copyOfFailureModeId;
		fMode.surveyScopeId = surveyScopeId;
		fMode.failureModeType = failureModeType;
		fMode.purpose = failureMode.function;
		fMode.guideword = guideword;
		fMode.failureMode = failureMode.failureMode;
		fMode.causeOfFailure = causeOfFailure;
		fMode.sourceOfFailure = sourceOfFailure;
		fMode.consequenceOfFailure = consequenceOfFailure;
		fMode.noticableFailure = noticableFailure;

		fMode.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		fMode.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;

		return fMode;
	}

	static CreateFailureModeInput(unitId: string): CreateFailureModeInput {
		const failureMode = new CreateFailureModeInput();
		failureMode.unitId = unitId;
		return failureMode;
	}
}
