import { IMJOPSurvey } from './mjop-survey';

export type IMJOPAsset = {
	code: string; // Objectnr
	assetName: string; // Naam
	marineInfrastrutureType: string; // marineInfrastrutureType
	mainMaterial: string; // Materiaal
	surveys?: IMJOPSurvey[];
};
