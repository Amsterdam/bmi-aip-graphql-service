import { IMJOPElement } from './mjop-element';

export type IMJOPSurvey = {
	condition: string;
	careScore: string; // Verzorgingsscore Object
	elements?: IMJOPElement[];
	craInspectionScore: number; // CRA Inspectie scores
};
