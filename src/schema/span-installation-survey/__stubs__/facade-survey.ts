import { FacadeSurvey as DomainFacadeSurvey } from '../types/facade-survey.repository.interface';
import { CreateFacadeSurveyInput } from '../dto/create-facade-survey.input';
import { UpdateFacadeSurveyInput } from '../dto/update-facade-survey.input';
import { FacadeSurvey } from '../models/facade-survey.model';

const facadeSurveyRaw: Omit<DomainFacadeSurvey, 'id'> = {
	surveyId: '9003d096-4dd2-4d0d-b74b-9406a721d94d',
	supportSystemId: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
	facadeDamageWithin1m: true,
	hinderingVegetation: true,
	wallPlateDamage: true,
	faultyMontage: true,
	nutNotFullyOverThreadedRod: true,
	missingFasteners: true,
	measuredPreload: 10,
	appliedAdditionalTraction: 2,
	facadeConnectionFailed: true,
	facadeConnectionFailureAdditionalTraction: 3,
	remarks: '__REMARKS__',
	created_at: undefined,
	updated_at: undefined,
};

export const createFacadeSurveyInput = Object.keys(facadeSurveyRaw).reduce((input, key) => {
	input[key] = facadeSurveyRaw[key];
	return input;
}, new CreateFacadeSurveyInput());

const updateFacadeSurvey = new UpdateFacadeSurveyInput();
updateFacadeSurvey.id = '796229bf-1b54-4bb7-a7d4-acb0dc3062df';
export const updateFacadeSurveyInput = Object.keys(facadeSurveyRaw).reduce((input, key) => {
	input[key] = facadeSurveyRaw[key];
	return input;
}, updateFacadeSurvey);

export const domainFacadeSurvey: DomainFacadeSurvey = {
	id: '796229bf-1b54-4bb7-a7d4-acb0dc3062df',
	...facadeSurveyRaw,
};

export const facadeSurvey = Object.keys(facadeSurveyRaw).reduce((acc, key) => {
	acc[key] = facadeSurveyRaw[key];
	return acc;
}, new FacadeSurvey());
