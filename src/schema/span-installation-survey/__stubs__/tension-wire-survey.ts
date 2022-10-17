import { TensionWireSurvey as DomainTensionWireSurvey } from '../types/tension-wire-survey.repository.interface';
import { CreateTensionWireSurveyInput } from '../dto/create-tension-wire-survey.input';
import { UpdateTensionWireSurveyInput } from '../dto/update-tension-wire-survey.input';
import { TensionWireSurvey } from '../models/tension-wire-survey.model';

const tensionWireSurveyRaw: Omit<DomainTensionWireSurvey, 'id'> = {
	supportSystemId: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
	tensionWireDamage: true,
	thirdPartyObjectsAttached: true,
	gaffTerminalDamage: true,
	gaffTerminalMissingParts: true,
	faultyMontage: true,
	tensionWireClampDamage: true,
	remarks: '__REMARKS__',
	created_at: undefined,
	updated_at: undefined,
};

export const createTensionWireSurveyInput = Object.keys(tensionWireSurveyRaw).reduce((input, key) => {
	input[key] = tensionWireSurveyRaw[key];
	return input;
}, new CreateTensionWireSurveyInput());

const updateTensionWireSurvey = new UpdateTensionWireSurveyInput();
updateTensionWireSurvey.id = '796229bf-1b54-4bb7-a7d4-acb0dc3062df';
export const updateTensionWireSurveyInput = Object.keys(tensionWireSurveyRaw).reduce((input, key) => {
	input[key] = tensionWireSurveyRaw[key];
	return input;
}, updateTensionWireSurvey);

export const domainTensionWireSurvey: DomainTensionWireSurvey = {
	id: '796229bf-1b54-4bb7-a7d4-acb0dc3062df',
	...tensionWireSurveyRaw,
};

export const tensionWireSurvey = Object.keys(tensionWireSurveyRaw).reduce((acc, key) => {
	acc[key] = tensionWireSurveyRaw[key];
	return acc;
}, new TensionWireSurvey());
