import { ISurvey } from './survey';

export interface IAsset {
	code: string; //'Objectnr'
	assetName: string; //'Naam'
	marineInfrastrutureType: string; //'marineInfrastrutureType'
	mainMaterial: string; //'Materiaal'
	surveys?: ISurvey[];
}
