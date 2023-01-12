import { ArkSurvey as DomainArkSurvey } from '../types/ark-survey.repository.interface';
import { CreateArkSurveyInput } from '../dto/create-ark-survey.input';
import { ArkSurveyFactory } from '../ark-survey.factory';
import { UpdateArkSurveyInput } from '../dto/update-ark-survey.input';
import { SaveArkSurveyInput } from '../dto/save-ark-survey.input';

const arkSurveyRaw: Omit<DomainArkSurvey, 'id'> = {
	surveyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
	ArkGeographyStart: {
		type: 'Point',
		coordinates: [52.370302853062604, 4.893996915500548],
	},
	ArkGeographyRDStart: {
		type: 'Point',
		coordinates: [52.370302853062604, 4.893996915500548],
	},
	ArkGeographyEnd: {
		type: 'Point',
		coordinates: [52.370302853062604, 4.893996915500548],
	},
	ArkGeographyRDEnd: {
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
//updateArkSurvey.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
export const updateArkSurveyInput = Object.keys(arkSurveyRaw).reduce((input, key) => {
	input[key] = arkSurveyRaw[key];
	return input;
}, updateArkSurvey);

const saveArkSurveyInput = new SaveArkSurveyInput();
//saveArkSurveyInput.id = '1f728e79-1b89-4333-a309-ea93bf17667c';
export const saveArkSurveyInputInput = Object.keys(arkSurveyRaw).reduce((input, key) => {
	input[key] = arkSurveyRaw[key];
	return input;
}, saveArkSurveyInput);

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
