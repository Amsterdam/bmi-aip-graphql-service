import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BaseCreateSurveyInput {
	@Field((type) => String)
	summaryAndAdvice: string;

	@Field((type) => String)
	condition: string;

	@Field((type) => String)
	careCondition: string;

	@Field((type) => String)
	inspectionStandardType: string;

	@Field((type) => String)
	surveryedOn?: string;

	@Field((type) => String)
	updatedOn?: string;

	@Field((type) => Number)
	pointCloudStorageUsed?: number;

	@Field((type) => Boolean)
	craInitialHistoryIsBuildBetween4074?: boolean;

	@Field((type) => Boolean)
	craInitialHistoryIsBuildBetween4074IsRelevant?: boolean;

	@Field((type) => Boolean)
	craInitialHistoryIsStaticallyIndeterminate?: boolean;

	@Field((type) => Boolean)
	craInitialHistoryIsStaticallyIndeterminateIsRelevant?: boolean;

	@Field((type) => String)
	craInitialHistoryBuildBetween4074Remarks?: string;

	@Field((type) => String)
	craInitialHistoryStaticallyIndeterminateRemarks?: string;

	@Field((type) => Boolean)
	craInspectionIsBuildBetween4074?: boolean;

	@Field((type) => Boolean)
	craInspectionIsBuildBetween4074IsRelevant?: boolean;

	@Field((type) => Boolean)
	craInspectionIsStaticallyIndeterminate?: boolean;

	@Field((type) => Boolean)
	craInspectionIsStaticallyIndeterminateIsRelevant?: boolean;

	@Field((type) => String)
	craInspectionBuildBetween4074Remarks?: string;

	@Field((type) => String)
	craInspectionStaticallyIndeterminateRemarks?: string;

	@Field((type) => Number)
	craInitialHistoryScore?: number;

	@Field((type) => Number)
	craInspectionScore?: number;

	@Field((type) => String)
	craInitialHistoryRemarks?: string;

	@Field((type) => String)
	craInspectionRemarks?: string;

	@Field((type) => Number)
	craInitialHistoryCondition?: number;

	@Field((type) => Number)
	craInspectionCondition?: number;

	@Field((type) => Number)
	craInitialHistoryConditionWithoutFactor?: number;

	@Field((type) => Number)
	craInspectionConditionWithoutFactor?: number;

	@Field((type) => Number)
	craInitialHistoryConditionScoreWithoutFactor?: number;

	@Field((type) => Number)
	craInspectionConditionScoreWithoutFactor?: number;

	@Field((type) => Number)
	craInitialHistoryConditionScore?: number;

	@Field((type) => Number)
	craInspectionConditionScore?: number;

	@Field((type) => String)
	preparedAuthor?: string;

	@Field((type) => String)
	preparedDate?: string;

	@Field((type) => String)
	verifiedAuthor?: string;

	@Field((type) => String)
	verifiedDate?: string;

	@Field((type) => Boolean)
	isFmecaAvailable?: boolean;

	@Field((type) => Boolean)
	isCraAvailable?: boolean;

	@Field((type) => String)
	inspectionStandardData?: any;

	@Field((type) => String)
	legacyFailureMode?: boolean;

	@Field((type) => String)
	operatorCompanyId?: string;

	@Field((type) => String)
	surveyorCompanyId?: string;

	@Field((type) => String, { nullable: true })
	'3dUri'?: string;

	@Field((type) => String, { nullable: true })
	'3dUriGeo'?: string;

	@Field((type) => String, { nullable: true })
	'3dUriMultiBeam'?: string;

	@Field((type) => String, { nullable: true })
	material?: string;

	@Field()
	created_at?: string;

	@Field()
	updated_at?: string;
}
