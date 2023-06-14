import { IElement } from './element';

export interface ISurvey {
	condition: string;
	careScore: string; //'Verzorgingsscore Object'
	elements?: IElement[];
	craInspectionScore: number; //'CRA Inspectie score'
}
