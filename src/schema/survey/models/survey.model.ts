import { Field, Int, Float, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'surveys' })
export class Survey {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	objectId: string;

	@Field((type) => String)
	batchId: string;

	@Field((type) => String)
	status: string;

	@Field((type) => String)
	description: string;

	@Field((type) => String, { nullable: true })
	summaryAndAdvice?: string;

	@Field((type) => String, { nullable: true })
	condition?: string;

	@Field((type) => String, { nullable: true })
	careCondition?: string;

	@Field((type) => String)
	inspectionStandardType: string;

	@Field((type) => String, { nullable: true })
	surveryedOn?: string;

	@Field((type) => String, { nullable: true })
	updatedOn?: string;

	@Field((type) => Int, { nullable: true })
	pointCloudStorageUsed?: number;

	@Field((type) => Boolean, { nullable: true })
	craInitialHistoryIsBuildBetween4074?: boolean;

	@Field((type) => Boolean, { nullable: true })
	craInitialHistoryIsBuildBetween4074IsRelevant?: boolean;

	@Field((type) => Boolean, { nullable: true })
	craInitialHistoryIsStaticallyIndeterminate?: boolean;

	@Field((type) => Boolean, { nullable: true })
	craInitialHistoryIsStaticallyIndeterminateIsRelevant?: boolean;

	@Field((type) => String, { nullable: true })
	craInitialHistoryBuildBetween4074Remarks?: string;

	@Field((type) => String, { nullable: true })
	craInitialHistoryStaticallyIndeterminateRemarks?: string;

	@Field((type) => Boolean, { nullable: true })
	craInspectionIsBuildBetween4074?: boolean;

	@Field((type) => Boolean, { nullable: true })
	craInspectionIsBuildBetween4074IsRelevant?: boolean;

	@Field((type) => Boolean, { nullable: true })
	craInspectionIsStaticallyIndeterminate?: boolean;

	@Field((type) => Boolean, { nullable: true })
	craInspectionIsStaticallyIndeterminateIsRelevant?: boolean;

	@Field((type) => String, { nullable: true })
	craInspectionBuildBetween4074Remarks?: string;

	@Field((type) => String, { nullable: true })
	craInspectionStaticallyIndeterminateRemarks?: string;

	@Field((type) => Float, { nullable: true })
	craInitialHistoryScore?: number;

	@Field((type) => Float, { nullable: true })
	craInspectionScore?: number;

	@Field((type) => String, { nullable: true })
	craInitialHistoryRemarks?: string;

	@Field((type) => String, { nullable: true })
	craInspectionRemarks?: string;

	@Field((type) => Int, { nullable: true })
	craInitialHistoryCondition?: number;

	@Field((type) => Int, { nullable: true })
	craInspectionCondition?: number;

	@Field((type) => Int, { nullable: true })
	craInitialHistoryConditionWithoutFactor?: number;

	@Field((type) => Int, { nullable: true })
	craInspectionConditionWithoutFactor?: number;

	@Field((type) => Int, { nullable: true })
	craInitialHistoryConditionScoreWithoutFactor?: number;

	@Field((type) => Int, { nullable: true })
	craInspectionConditionScoreWithoutFactor?: number;

	@Field((type) => Int, { nullable: true })
	craInitialHistoryConditionScore?: number;

	@Field((type) => Int, { nullable: true })
	craInspectionConditionScore?: number;

	@Field((type) => String, { nullable: true })
	preparedAuthor?: string;

	@Field((type) => String, { nullable: true })
	preparedDate?: string;

	@Field((type) => String, { nullable: true })
	verifiedAuthor?: string;

	@Field((type) => String, { nullable: true })
	verifiedDate?: string;

	@Field((type) => Boolean, { nullable: true })
	isFmecaAvailable?: boolean;

	@Field((type) => Boolean, { nullable: true })
	isCraAvailable?: boolean;

	@Field((type) => String, { nullable: true })
	inspectionStandardData?: any;

	@Field((type) => String, { nullable: true })
	legacyFailureMode?: boolean;

	@Field((type) => String, { nullable: true })
	operatorCompanyId?: string;

	@Field((type) => String, { nullable: true })
	surveyorCompanyId?: string;

	@Field((type) => String, { nullable: true })
	uri3d?: string;

	@Field((type) => String, { nullable: true })
	uriGeo3d?: string;

	@Field((type) => String, { nullable: true })
	uriMultiBeam3d?: string;

	@Field((type) => String, { nullable: true })
	material?: string;

	@Field((type) => String, { nullable: true })
	created_at?: string;

	@Field((type) => String, { nullable: true })
	updated_at?: string;
}
