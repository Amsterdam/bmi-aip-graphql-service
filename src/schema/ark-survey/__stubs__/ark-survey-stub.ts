import { DbSurvey } from 'src/schema/survey/types/survey.repository.interface';

import { ArkSurvey as DomainArkSurvey } from '../types/ark-survey.repository.interface';
import { CreateArkSurveyInput } from '../dto/create-ark-survey.input';
import { ArkSurveyFactory } from '../ark-survey.factory';
import { UpdateArkSurveyInput } from '../dto/update-ark-survey.input';
import { SaveArkSurveyInput } from '../dto/save-ark-survey.input';

const arkSurveyRaw: Omit<DomainArkSurvey, 'id'> = {
	surveyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
	arkGeographyStart: {
		type: 'Point',
		coordinates: [52.370302853062604, 4.893996915500548],
	},
	arkGeographyRDStart: {
		type: 'Point',
		coordinates: [52.370302853062604, 4.893996915500548],
	},
	arkGeographyEnd: {
		type: 'Point',
		coordinates: [52.370302853062604, 4.893996915500548],
	},
	arkGeographyRDEnd: {
		type: 'Point',
		coordinates: [52.370302853062604, 4.893996915500548],
	},
	created_at: null,
	updated_at: null,
	deleted_at: null,
};

export const surveyRaw: Pick<
	DbSurvey,
	'preparedAuthor' | 'preparedDate' | 'verifiedAuthor' | 'verifiedDate' | 'inspectionStandardData'
> = {
	preparedAuthor: '__AUTHOR_01__',
	preparedDate: new Date('2023-02-01 18:04:24.621 +0100'),
	verifiedAuthor: '__VERIVIER_01__',
	verifiedDate: new Date('2023-02-01 18:04:24.621 +0100'),
	inspectionStandardData: { remarks: '__TEST__' },
};

export const createArkSurveyInput = Object.keys(arkSurveyRaw).reduce((input, key) => {
	input[key] = arkSurveyRaw[key];
	return input;
}, new CreateArkSurveyInput());

const updateSurvey = new UpdateArkSurveyInput();
export const updateSurveyInput = Object.keys(surveyRaw).reduce((input, key) => {
	input[key] = surveyRaw[key];
	return { id: arkSurveyRaw.surveyId, ...input };
}, updateSurvey);

const updateArkSurvey = new UpdateArkSurveyInput();
export const updateArkSurveyInput = Object.keys(arkSurveyRaw).reduce((input, key) => {
	input[key] = arkSurveyRaw[key];
	return input;
}, updateArkSurvey);

const saveArkSurveyInputRaw = new SaveArkSurveyInput();
export const saveArkSurveyInput = Object.keys(arkSurveyRaw).reduce((input, key) => {
	input[key] = arkSurveyRaw[key];
	return input;
}, saveArkSurveyInputRaw);

export const saveArkSurveyInputWithReachSegmentsInput: UpdateArkSurveyInput = {
	...updateArkSurvey,
	reachSegments: [
		{
			name: 'reach segment 1',
			consequenceScore: 4,
			failureModeScore: 1,
			riskScore: 1,
			riskScoreDigit: 5.0,
			reachSegmentLength: 1.23,
			created_at: null,
			updated_at: null,
		},
		{
			name: 'reach segment 2',
			consequenceScore: 4,
			failureModeScore: 1,
			riskScore: 5,
			riskScoreDigit: 15.0,
			reachSegmentLength: 1.23,
			created_at: null,
			updated_at: null,
		},
	],
};

export const domainSurvey: Pick<
	DbSurvey,
	'id' | 'preparedAuthor' | 'preparedDate' | 'verifiedAuthor' | 'verifiedDate' | 'inspectionStandardData'
> = { id: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7', ...surveyRaw };

export const domainArkSurvey: DomainArkSurvey = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	...arkSurveyRaw,
};

export const ArkSurvey = ArkSurveyFactory.createArkSurvey(domainArkSurvey);

export const deletedArkSurvey: DomainArkSurvey = {
	...domainArkSurvey,
};
