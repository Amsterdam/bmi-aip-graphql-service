import { IMJOPSurvey } from './mjop-survey';

export interface IMJOPAsset {
	code: string; // Objectnr
	assetName: string; // Naam
	marineInfrastrutureType: string; // marineInfrastrutureType
	mainMaterial: string; // Materiaal
	surveys?: IMJOPSurvey[];
}
