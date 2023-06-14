import { IAsset } from './asset';
import { ISurvey } from './survey';

export interface MJOPRecord {
	asset: IAsset;
	survey: ISurvey;
	careScore: string;
	// elements: IElement[];
	code: string; //'Objectnr'
	assetName: string; //'Naam'
	marineInfrastrutureType: string; //'marineInfrastrutureType'
	mainMaterial: string; //'Materiaal'

	condition: string; //'Conditiescore Object'
	careCondition: string;

	elementName: string; //'elementName'

	unitName: string; //'Bouwdeel'
	unitMaterial: string; //'Materiaal'
	quantity: number; //'Hoeveelheid'
	quantityUnitOfMeasurement: string;

	failureModeName: string; //'Faalwijze'
	faaloorzaak: string; //'Faaloorzaak'
	bronVanFalen: string; //'Bron van falen'
	gevolgVanFalen: string; //'Gevolg van falen'
	analysisRemarks: string; //'Bureaustudie'
	verificationRemarks: string; //'Verificatie'
	maintenanceRemarks: string; //'Onderhoud'
	verificationRamsR: string; //'R'
	verificationRamsA: string; //'A'
	verificationRamsS: string; //'S'
	verificationRamsC: string; //'C'
	verificationRamsEc: string; //'Ec'
	verificationRamsEnv: string; //'Env'
	verificationRamsP: string; //'P'
	verificationRamsWeightedPriority: string; //'Prioritering'

	craInspectionScore: string; //'CRA Inspectie score'

	defectName: string; //'Schadebeeld'
	seriousness: number;
	intensity: number;
	extend: number;
	repairAdvice: string; //'Herstel advies'
	defectScore: number; //'Conditiescore Gebrek'
	defectCareScore: number; //'Verzorgingsscore Gebrek'
	ramsR: string; //'ramsR'
	ramsA: string; //'ramsA'
	ramsS: string; //'ramsS'
	ramsEc: string; //'ramsEc'
	ramsEnv: string; //'ramsEnv'
	ramsWeightedPriority: string;
	ramsTotalPriority: string; //'Prioritering'

	unitCondition: string; //'Conditiescore Bouwdeel'
	elementCondition: string; //'Conditiescore Element'
	unitCare: string; //'Verzorgingsscore Bouwdeel'
	elementCare: string; //'Verzorgingsscore Element'

	// maintenanceColumnsCollection
	maintenanceDescription: string; //'Maatregel'
	maintenanceType: string; //'Type onderhoud'
	maintenanceCycle: string; //'Cyclus'
	maintenanceUnitPrice: string; //'Eenheidsprijs'
	maintenanceCostSurcharge: string; //'Toeslag'
	totalCost: string; //'Totale kosten'
	totalCostWithSurcharge: string; //'Totale kosten incl.toeslagen'
	maintenanceYear: string; //'Planjaar'
	cyclicMaintenance: CyclicMaintenance;
}

export interface CyclicMaintenance {
	[year: string]: number;
}

// export type UnionInterface = IAsset | IElement | IUnit;
type UnionKeys<T> = T extends any ? keyof T : never;
export type MJOPColumnHeaderKeys = UnionKeys<MJOPRecord>;
