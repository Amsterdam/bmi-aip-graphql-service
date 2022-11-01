import { JunctionBoxSurvey as DomainJunctionBoxSurvey } from '../types/junction-box-survey.repository.interface';
import { CreateJunctionBoxSurveyInput } from '../dto/create-junction-box-survey.input';
import { UpdateJunctionBoxSurveyInput } from '../dto/update-junction-box-survey.input';
import { JunctionBoxSurvey } from '../models/junction-box-survey.model';

const junctionBoxSurveyRaw: Omit<DomainJunctionBoxSurvey, 'id'> = {
	junctionBoxId: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
	cableDamage: true,
	faultyMontageTensionWire: true,
	faultyMontageFacade: true,
	junctionBoxDamage: true,
	stickerNotReadable: true,
	remarks: '__REMARKS__',
	created_at: undefined,
	updated_at: undefined,
};

export const createJunctionBoxSurveyInput = Object.keys(junctionBoxSurveyRaw).reduce((input, key) => {
	input[key] = junctionBoxSurveyRaw[key];
	return input;
}, new CreateJunctionBoxSurveyInput());

const updateJunctionBoxSurvey = new UpdateJunctionBoxSurveyInput();
updateJunctionBoxSurvey.id = '796229bf-1b54-4bb7-a7d4-acb0dc3062df';
export const updateJunctionBoxSurveyInput = Object.keys(junctionBoxSurveyRaw).reduce((input, key) => {
	input[key] = junctionBoxSurveyRaw[key];
	return input;
}, updateJunctionBoxSurvey);

export const domainJunctionBoxSurvey: DomainJunctionBoxSurvey = {
	id: '796229bf-1b54-4bb7-a7d4-acb0dc3062df',
	...junctionBoxSurveyRaw,
};

export const junctionBoxSurvey = Object.keys(junctionBoxSurveyRaw).reduce((acc, key) => {
	acc[key] = junctionBoxSurveyRaw[key];
	return acc;
}, new JunctionBoxSurvey());
