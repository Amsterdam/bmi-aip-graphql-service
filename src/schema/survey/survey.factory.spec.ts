import { SurveyFactory } from './survey.factory';
import { domainSurvey, survey } from './__stubs__';
import { Survey } from './models/survey.model';
import { InspectionStandard } from './types';
import { SurveyStates } from './types/surveyStates';

describe('SurveyFactory', () => {
	test('CreateSurvey() constructs an instance of an Survey GraphQL model', () => {
		const result = SurveyFactory.CreateSurvey(domainSurvey);
		expect(result).toBeInstanceOf(Survey);
		expect(result).toEqual(expect.objectContaining(survey));
	});

	test('CreateSurveyInput', () => {
		const result = SurveyFactory.CreateSurvey(domainSurvey);
		expect(result).toEqual({
			batchId: '',
			careCondition: '',
			condition: '__CONDITION__',
			craInitialHistoryBuildBetween4074Remarks: '',
			craInitialHistoryCondition: 0,
			craInitialHistoryConditionScore: 0,
			craInitialHistoryConditionScoreWithoutFactor: 0,
			craInitialHistoryConditionWithoutFactor: 0,
			craInitialHistoryIsBuildBetween4074: false,
			craInitialHistoryIsBuildBetween4074IsRelevant: false,
			craInitialHistoryIsStaticallyIndeterminate: false,
			craInitialHistoryIsStaticallyIndeterminateIsRelevant: false,
			craInitialHistoryRemarks: '',
			craInitialHistoryScore: 0,
			craInitialHistoryStaticallyIndeterminateRemarks: '',
			craInspectionBuildBetween4074Remarks: '',
			craInspectionCondition: 0,
			craInspectionConditionScore: 0,
			craInspectionConditionScoreWithoutFactor: 0,
			craInspectionConditionWithoutFactor: 0,
			craInspectionIsBuildBetween4074: false,
			craInspectionIsBuildBetween4074IsRelevant: false,
			craInspectionIsStaticallyIndeterminate: false,
			craInspectionIsStaticallyIndeterminateIsRelevant: false,
			craInspectionRemarks: '',
			craInspectionScore: 0,
			craInspectionStaticallyIndeterminateRemarks: '',
			description: '__DESCRIPTION__',
			id: '0deb07f3-28f5-47e1-b72a-d1b2a19d4670',
			inspectionStandardData: '',
			inspectionStandardType: InspectionStandard.spanInstallation,
			isCraAvailable: false,
			isFmecaAvailable: false,
			legacyFailureMode: false,
			material: '',
			objectId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
			operatorCompanyId: '',
			pointCloudStorageUsed: null,
			preparedAuthor: '',
			preparedDate: null,
			status: SurveyStates.open,
			summaryAndAdvice: '',
			surveyedOn: null,
			surveyorCompanyId: '',
			updatedOn: null,
			uri3d: '',
			uriGeo3d: '',
			uriMultiBeam3d: '',
			verifiedAuthor: '',
			verifiedDate: null,
		});
		expect(result).toBeInstanceOf(Survey);
	});
});
