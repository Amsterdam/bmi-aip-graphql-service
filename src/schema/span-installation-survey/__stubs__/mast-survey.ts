import { MastSurvey as DomainMastSurvey } from '../types/mast-survey.repository.interface';
import { CreateMastSurveyInput } from '../dto/create-mast-survey.input';
import { UpdateMastSurveyInput } from '../dto/update-mast-survey.input';
import { MastSurvey } from '../models/mast-survey.model';

const mastSurveyRaw: Omit<DomainMastSurvey, 'id'> = {
	surveyId: '9003d096-4dd2-4d0d-b74b-9406a721d94d',
	supportSystemId: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
	mastDamage: true,
	mastMissingParts: true,
	tensionMastAngle: 10,
	mastAttachmentDamage: true,
	mastBracketMissingParts: true,
	mastBracketDamage: true,
	remarks: '__REMARKS__',
	created_at: undefined,
	updated_at: undefined,
};

export const createMastSurveyInput = Object.keys(mastSurveyRaw).reduce((input, key) => {
	input[key] = mastSurveyRaw[key];
	return input;
}, new CreateMastSurveyInput());

const updateMastSurvey = new UpdateMastSurveyInput();
updateMastSurvey.id = '796229bf-1b54-4bb7-a7d4-acb0dc3062df';
export const updateMastSurveyInput = Object.keys(mastSurveyRaw).reduce((input, key) => {
	input[key] = mastSurveyRaw[key];
	return input;
}, updateMastSurvey);

export const domainMastSurvey: DomainMastSurvey = {
	id: '796229bf-1b54-4bb7-a7d4-acb0dc3062df',
	...mastSurveyRaw,
};

export const mastSurvey = Object.keys(mastSurveyRaw).reduce((acc, key) => {
	acc[key] = mastSurveyRaw[key];
	return acc;
}, new MastSurvey());
