import { DbSurvey as DomainSurvey } from '../survey/types/survey.repository.interface';

import { Survey } from './models/survey.model';

export class SurveyFactory {
	static CreateSurvey({
		id,
		objectId,
		batchId,
		status,
		description,
		summaryAndAdvice,
		condition,
		careCondition,
		inspectionStandardType,
		surveryedOn,
		updatedOn,
		pointCloudStorageUsed,
		craInitialHistoryIsBuildBetween4074,
		craInitialHistoryIsBuildBetween4074IsRelevant,
		craInitialHistoryIsStaticallyIndeterminate,
		craInitialHistoryIsStaticallyIndeterminateIsRelevant,
		craInitialHistoryBuildBetween4074Remarks,
		craInitialHistoryStaticallyIndeterminateRemarks,
		craInspectionIsBuildBetween4074,
		craInspectionIsBuildBetween4074IsRelevant,
		craInspectionIsStaticallyIndeterminate,
		craInspectionIsStaticallyIndeterminateIsRelevant,
		craInspectionBuildBetween4074Remarks,
		craInspectionStaticallyIndeterminateRemarks,
		craInitialHistoryScore,
		craInspectionScore,
		craInitialHistoryRemarks,
		craInspectionRemarks,
		craInitialHistoryCondition,
		craInspectionCondition,
		craInitialHistoryConditionWithoutFactor,
		craInspectionConditionWithoutFactor,
		craInitialHistoryConditionScoreWithoutFactor,
		craInspectionConditionScoreWithoutFactor,
		craInitialHistoryConditionScore,
		craInspectionConditionScore,
		preparedAuthor,
		preparedDate,
		verifiedAuthor,
		verifiedDate,
		isFmecaAvailable,
		isCraAvailable,
		inspectionStandardData,
		legacyFailureMode,
		operatorCompanyId,
		surveyorCompanyId,
		dUri,
		dUriGeo,
		dUriMultiBeam,
		material,
	}: DomainSurvey): Survey {
		const survey = new Survey();
		survey.id = id;
		survey.objectId = objectId;
		survey.batchId = batchId;
		survey.status = status;
		survey.description = description;
		survey.summaryAndAdvice = summaryAndAdvice;
		survey.condition = condition;
		survey.careCondition = careCondition;
		survey.inspectionStandardType = inspectionStandardType;
		survey.surveyedOn = surveryedOn instanceof Date ? surveryedOn.toUTCString() : null;
		survey.updatedOn = updatedOn instanceof Date ? updatedOn.toUTCString() : null;
		survey.pointCloudStorageUsed = pointCloudStorageUsed;
		survey.craInitialHistoryIsBuildBetween4074 = craInitialHistoryIsBuildBetween4074;
		survey.craInitialHistoryIsBuildBetween4074IsRelevant = craInitialHistoryIsBuildBetween4074IsRelevant;
		survey.craInitialHistoryIsStaticallyIndeterminate = craInitialHistoryIsStaticallyIndeterminate;
		survey.craInitialHistoryIsStaticallyIndeterminateIsRelevant =
			craInitialHistoryIsStaticallyIndeterminateIsRelevant;
		survey.craInitialHistoryBuildBetween4074Remarks = craInitialHistoryBuildBetween4074Remarks;
		survey.craInitialHistoryStaticallyIndeterminateRemarks = craInitialHistoryStaticallyIndeterminateRemarks;
		survey.craInspectionIsBuildBetween4074 = craInspectionIsBuildBetween4074;
		survey.craInspectionIsBuildBetween4074IsRelevant = craInspectionIsBuildBetween4074IsRelevant;
		survey.craInspectionIsStaticallyIndeterminate = craInspectionIsStaticallyIndeterminate;
		survey.craInspectionIsStaticallyIndeterminateIsRelevant = craInspectionIsStaticallyIndeterminateIsRelevant;
		survey.craInspectionBuildBetween4074Remarks = craInspectionBuildBetween4074Remarks;
		survey.craInspectionStaticallyIndeterminateRemarks = craInspectionStaticallyIndeterminateRemarks;
		survey.craInitialHistoryScore = Number(craInitialHistoryScore);
		survey.craInspectionScore = Number(craInspectionScore);
		survey.craInitialHistoryRemarks = craInitialHistoryRemarks;
		survey.craInspectionRemarks = craInspectionRemarks;
		survey.craInitialHistoryCondition = craInitialHistoryCondition;
		survey.craInspectionCondition = craInspectionCondition;
		survey.craInitialHistoryConditionWithoutFactor = craInitialHistoryConditionWithoutFactor;
		survey.craInspectionConditionWithoutFactor = craInspectionConditionWithoutFactor;
		survey.craInitialHistoryConditionScoreWithoutFactor = craInitialHistoryConditionScoreWithoutFactor;
		survey.craInspectionConditionScoreWithoutFactor = craInspectionConditionScoreWithoutFactor;
		survey.craInitialHistoryConditionScore = craInitialHistoryConditionScore;
		survey.craInspectionConditionScore = craInspectionConditionScore;
		survey.preparedAuthor = preparedAuthor;
		survey.preparedDate = preparedDate instanceof Date ? preparedDate.toUTCString() : null;
		survey.verifiedAuthor = verifiedAuthor;
		survey.verifiedDate = verifiedDate instanceof Date ? verifiedDate.toUTCString() : null;
		survey.isFmecaAvailable = isFmecaAvailable;
		survey.isCraAvailable = isCraAvailable;
		survey.inspectionStandardData = JSON.parse(JSON.stringify(inspectionStandardData));
		survey.legacyFailureMode = legacyFailureMode;
		survey.operatorCompanyId = operatorCompanyId;
		survey.surveyorCompanyId = surveyorCompanyId;
		survey.uri3d = dUri;
		survey.uriGeo3d = dUriGeo;
		survey.uriMultiBeam3d = dUriMultiBeam;
		survey.material = material;
		return survey;
	}
}
