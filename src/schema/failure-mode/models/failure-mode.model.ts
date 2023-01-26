import { Field, ID, ObjectType } from '@nestjs/graphql';

import { FailureModeMetaData } from './failure-mode-meta-data.model';

@ObjectType({ description: 'failureMode' })
export class FailureMode {
	@Field((type) => ID)
	id: string;

	@Field((type) => ID)
	surveyId: string;

	@Field((type) => ID)
	elementId: string;

	@Field((type) => ID)
	unitId: string;

	@Field((type) => ID, { nullable: true })
	manifestationId?: string;

	@Field((type) => String, { nullable: true })
	customName?: string;

	@Field((type) => FailureModeMetaData, { nullable: true })
	metaData?: FailureModeMetaData;

	@Field((type) => String, { nullable: true })
	analysisRemarks?: string;

	@Field((type) => String, { nullable: true })
	verificationRemarks?: string;

	@Field((type) => String, { nullable: true })
	maintenanceRemarks?: string;

	@Field((type) => ID, { nullable: true })
	defaultFailureModeId?: string;

	@Field((type) => String, { nullable: true })
	analysisRamsR?: string;

	@Field((type) => String, { nullable: true })
	analysisRamsA?: string;

	@Field((type) => String, { nullable: true })
	analysisRamsS?: string;

	@Field((type) => String, { nullable: true })
	analysisRamsC?: string;

	@Field((type) => String, { nullable: true })
	analysisRamsEc?: string;

	@Field((type) => String, { nullable: true })
	analysisRamsEnv?: string;

	@Field((type) => String, { nullable: true })
	analysisRamsP?: string;

	@Field((type) => String, { nullable: true })
	verificationRamsR?: string;

	@Field((type) => String, { nullable: true })
	verificationRamsA?: string;

	@Field((type) => String, { nullable: true })
	verificationRamsS?: string;

	@Field((type) => String, { nullable: true })
	verificationRamsC?: string;

	@Field((type) => String, { nullable: true })
	verificationRamsEc?: string;

	@Field((type) => String, { nullable: true })
	verificationRamsEnv?: string;

	@Field((type) => String, { nullable: true })
	verificationRamsP?: string;

	@Field((type) => String, { nullable: true })
	maintenanceRamsR?: string;

	@Field((type) => String, { nullable: true })
	maintenanceRamsA?: string;

	@Field((type) => String, { nullable: true })
	maintenanceRamsS?: string;

	@Field((type) => String, { nullable: true })
	maintenanceRamsC?: string;

	@Field((type) => String, { nullable: true })
	maintenanceRamsEc?: string;

	@Field((type) => String, { nullable: true })
	maintenanceRamsEnv?: string;

	@Field((type) => String, { nullable: true })
	maintenanceRamsP?: string;

	@Field((type) => String, { nullable: true })
	analysisRamsTotalPriority?: string;

	@Field((type) => String, { nullable: true })
	verificationRamsTotalPriority?: string;

	@Field((type) => String, { nullable: true })
	maintenanceRamsTotalPriority?: string;

	@Field((type) => String, { nullable: true })
	analysisRamsWeightedPriority?: string;

	@Field((type) => String, { nullable: true })
	verificationRamsWeightedPriority?: string;

	@Field((type) => String, { nullable: true })
	maintenanceRamsWeightedPriority?: string;

	@Field((type) => ID, { nullable: true })
	copyOfFailureModeId?: string;

	@Field((type) => Number, { nullable: true })
	surveyScopeId?: number;

	@Field((type) => String, { nullable: true })
	failureModeType?: string;

	@Field((type) => String, { nullable: true })
	purpose?: string; // function

	@Field((type) => String, { nullable: true })
	guideword?: string;

	@Field((type) => String, { nullable: true })
	failureMode?: string;

	@Field((type) => String, { nullable: true })
	causeOfFailure?: string;

	@Field((type) => String, { nullable: true })
	sourceOfFailure?: string;

	@Field((type) => String, { nullable: true })
	consequenceOfFailure?: string;

	@Field((type) => String, { nullable: true })
	noticableFailure?: string;

	@Field((type) => String, { nullable: true })
	createdAt?: string;

	@Field((type) => String, { nullable: true })
	updatedAt?: string;
}
