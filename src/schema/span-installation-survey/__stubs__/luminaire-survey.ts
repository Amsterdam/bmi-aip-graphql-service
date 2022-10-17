import { LuminaireSurvey as DomainLuminaireSurvey } from '../types/luminaire-survey.repository.interface';
import { CreateLuminaireSurveyInput } from '../dto/create-luminaire-survey.input';
import { UpdateLuminaireSurveyInput } from '../dto/update-luminaire-survey.input';
import { LuminaireSurvey } from '../models/luminaire-survey.model';

const luminaireSurveyRaw: Omit<DomainLuminaireSurvey, 'id'> = {
	luminaireId: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
	luminaireDamage: true,
	remarks: '__REMARKS__',
	created_at: undefined,
	updated_at: undefined,
};

export const createLuminaireSurveyInput = Object.keys(luminaireSurveyRaw).reduce((input, key) => {
	input[key] = luminaireSurveyRaw[key];
	return input;
}, new CreateLuminaireSurveyInput());

const updateLuminaireSurvey = new UpdateLuminaireSurveyInput();
updateLuminaireSurvey.id = '796229bf-1b54-4bb7-a7d4-acb0dc3062df';
export const updateLuminaireSurveyInput = Object.keys(luminaireSurveyRaw).reduce((input, key) => {
	input[key] = luminaireSurveyRaw[key];
	return input;
}, updateLuminaireSurvey);

export const domainLuminaireSurvey: DomainLuminaireSurvey = {
	id: '796229bf-1b54-4bb7-a7d4-acb0dc3062df',
	...luminaireSurveyRaw,
};

export const luminaireSurvey = Object.keys(luminaireSurveyRaw).reduce((acc, key) => {
	acc[key] = luminaireSurveyRaw[key];
	return acc;
}, new LuminaireSurvey());
