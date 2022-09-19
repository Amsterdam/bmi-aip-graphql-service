import { Decimal } from '@prisma/client/runtime';

import { Survey } from '../models/survey.model';
import { CreateSurveyInput } from '../dto/create-survey.input';
import { DbSurvey as DomainSurvey } from '../types/survey.repository.interface';
import { SurveyFactory } from '../survey.factory';

const survey1 = new Survey();
survey1.id = '0deb07f3-28f5-47e1-b72a-d1b2a19d4670';
survey1.description = '__DESCRIPTION__';
survey1.inspectionStandardType = '__INSPECTIONSTANDARDTYPE__';
survey1.status = '__STATUS__';

const survey2 = new Survey();
survey2.id = 'ab8adf9e-65a0-40aa-9b1c-ea3537d1f8d7';
survey2.description = 'BRU0002';

export { survey1, survey2 };

export const surveyRaw: Omit<DomainSurvey, 'id'> = {
	objectId: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
	description: '__DESCRIPTION__',
	condition: '__CONDITION__',
	inspectionStandardType: '__INSPECTIONSTANDARDTYPE__',
	status: '__STATUS__',
	surveryedOn: undefined,
	updatedOn: undefined,
	batchId: '',
	operatorCompanyId: '',
	surveyorCompanyId: '',
	summaryAndAdvice: '',
	careCondition: '',
	dUri: '',
	created_at: undefined,
	updated_at: undefined,
	storageUsed: null,
	material: '',
	isDOMLight: false,
	pointCloudStorageUsed: null,
	isAssetDescriptionVisible: false,
	isAnnotationsDefaultVisible: false,
	isVideoDownloadVisible: false,
	projectNumber: '',
	dUriGeo: '',
	dUriMultiBeam: '',
	scanLineCoordinates: '',
	shapesInModel: '',
	isFmecaAvailable: false,
	isCraAvailable: false,
	craInitialHistoryIsBuildBetween4074: false,
	craInitialHistoryIsStaticallyIndeterminate: false,
	craInitialHistoryBuildBetween4074Remarks: '',
	craInitialHistoryStaticallyIndeterminateRemarks: '',
	craInspectionIsBuildBetween4074: false,
	craInspectionIsStaticallyIndeterminate: false,
	craInspectionBuildBetween4074Remarks: '',
	craInspectionStaticallyIndeterminateRemarks: '',
	craInitialHistoryRemarks: '',
	craInspectionRemarks: '',
	craInitialHistoryScore: new Decimal(0),
	craInspectionScore: new Decimal(0),
	craInitialHistoryCondition: 0,
	craInspectionCondition: 0,
	craInitialHistoryConditionWithoutFactor: 0,
	craInspectionConditionWithoutFactor: 0,
	preparedAuthor: '',
	preparedDate: undefined,
	verifiedAuthor: '',
	verifiedDate: undefined,
	craInitialHistoryConditionScoreWithoutFactor: 0,
	craInspectionConditionScoreWithoutFactor: 0,
	craInitialHistoryConditionScore: 0,
	craInspectionConditionScore: 0,
	inspectionStandardData: '',
	craInitialHistoryIsBuildBetween4074IsRelevant: false,
	craInitialHistoryIsStaticallyIndeterminateIsRelevant: false,
	craInspectionIsBuildBetween4074IsRelevant: false,
	craInspectionIsStaticallyIndeterminateIsRelevant: false,
	legacyFailureMode: false,
};

export const surveyInput = Object.keys(surveyRaw).reduce((input, key) => {
	input[key] = surveyRaw[key];
	return input;
}, new CreateSurveyInput());

export const domainSurvey: DomainSurvey = {
	...surveyRaw,
	id: '0deb07f3-28f5-47e1-b72a-d1b2a19d4670',
	description: '__DESCRIPTION__',
	inspectionStandardType: '__INSPECTIONSTANDARDTYPE__',
	objectId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
};

export const survey = SurveyFactory.CreateSurvey(domainSurvey);
