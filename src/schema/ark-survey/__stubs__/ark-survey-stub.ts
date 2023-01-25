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

export const createArkSurveyInput = Object.keys(arkSurveyRaw).reduce((input, key) => {
	input[key] = arkSurveyRaw[key];
	return input;
}, new CreateArkSurveyInput());

const updateArkSurvey = new UpdateArkSurveyInput();
export const updateArkSurveyInput = Object.keys(arkSurveyRaw).reduce((input, key) => {
	input[key] = arkSurveyRaw[key];
	return input;
}, updateArkSurvey);

const saveArkSurveyInput = new SaveArkSurveyInput();
export const saveArkSurveyInputInput = Object.keys(arkSurveyRaw).reduce((input, key) => {
	input[key] = arkSurveyRaw[key];
	return input;
}, saveArkSurveyInput);

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
		},
		{
			name: 'reach segment 2',
			consequenceScore: 4,
			failureModeScore: 1,
			riskScore: 5,
			riskScoreDigit: 15.0,
			reachSegmentLength: 1.23,
		},
	],
};

export const domainArkSurvey: DomainArkSurvey = {
	id: '1f728e79-1b89-4333-a309-ea93bf17667c',
	...arkSurveyRaw,
	deleted_at: null,
};

export const ArkSurvey = ArkSurveyFactory.createArkSurvey(domainArkSurvey);

export const deletedArkSurvey: DomainArkSurvey = {
	...domainArkSurvey,
	deleted_at: new Date('Thu, 09 Jun 2022 15:03:22 GMT'),
};
