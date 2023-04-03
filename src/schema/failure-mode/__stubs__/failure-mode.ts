import { FailureMode } from '../models/failure-mode.model';
import { CreateFailureModeInput } from '../dto/create-failure-mode.input';
import { FailureMode as DomainFailureMode } from '../types/failure-mode.repository.interface';
import { FailureModeFactory } from '../failure-mode.factory';
import { UpdateFailureModeInput } from '../dto/update-failure-mode.input';

import { FailureModeMetaDataInput } from './../dto/failure-mode-meta-data.input';

const failureMode1 = new FailureMode();
failureMode1.id = '9812a0c4-9cb4-4df2-b490-7a5648922f79';
failureMode1.surveyId = '68a95a2c-b909-e77f-4d66-9fd5afef5adb';
failureMode1.unitId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';

const failureMode2 = new FailureMode();
failureMode2.id = '6d79f740-186d-4197-888e-3384fcb8cb6a';
failureMode2.surveyId = '68a95a2c-b909-e77f-4d66-9fd5afef5adb';
failureMode2.unitId = 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7';

export { failureMode1, failureMode2 };

const failureModeMetaData = new FailureModeMetaDataInput();
failureModeMetaData.failureCause = null;

const failureModeRaw: Omit<DomainFailureMode, 'id'> = {
	surveyId: '68a95a2c-b909-e77f-4d66-9fd5afef5adb',
	unitId: '68a95a2c-b909-e77f-4d66-9fd5afef5afb',
	elementId: '',
	manifestationId: '',
	customName: '',
	metaData: JSON.parse(JSON.stringify(failureModeMetaData)),
	analysisRemarks: '',
	verificationRemarks: '',
	maintenanceRemarks: '',
	created_at: undefined,
	updated_at: undefined,
	defaultFailureModeId: '',
	analysisRamsR: '',
	analysisRamsA: '',
	analysisRamsS: '',
	analysisRamsC: '',
	analysisRamsEc: '',
	analysisRamsEnv: '',
	analysisRamsP: '',
	verificationRamsR: '',
	verificationRamsA: '',
	verificationRamsS: '',
	verificationRamsC: '',
	verificationRamsEc: '',
	verificationRamsEnv: '',
	verificationRamsP: '',
	maintenanceRamsR: '',
	maintenanceRamsA: '',
	maintenanceRamsS: '',
	maintenanceRamsC: '',
	maintenanceRamsEc: '',
	maintenanceRamsEnv: '',
	maintenanceRamsP: '',
	analysisRamsTotalPriority: '',
	verificationRamsTotalPriority: '',
	maintenanceRamsTotalPriority: '',
	analysisRamsWeightedPriority: '',
	verificationRamsWeightedPriority: '',
	maintenanceRamsWeightedPriority: '',
	copyOfFailureModeId: '',
	surveyScopeId: 0,
	failureModeType: '',
	guideword: '',
	failureMode: '',
	causeOfFailure: '',
	sourceOfFailure: '',
	consequenceOfFailure: '',
	noticableFailure: '',
	function: '',
};

export const failureModeInput = Object.keys(failureModeRaw).reduce((input, key) => {
	input[key] = failureModeRaw[key];
	return input;
}, new CreateFailureModeInput());

const updateFailureMode = new UpdateFailureModeInput();
updateFailureMode.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
export const updateFailureModeInput = Object.keys(failureModeRaw).reduce((input, key) => {
	if (key === 'failureModeMetaData') {
		input.metaData = failureModeMetaData;
	}
	input[key] = failureModeRaw[key];
	return input;
}, updateFailureMode);

export const domainFailureMode: DomainFailureMode = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	...failureModeRaw,
	// deleted_at: null,
};

export const failureMode = FailureModeFactory.CreateFailureMode(domainFailureMode);
