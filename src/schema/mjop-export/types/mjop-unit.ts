import { IMJOPDerivedConditionScoreUnit } from './mjop-derived-condition-score-unit';
import { IMJOPCyclicMeasure } from './mjop-cyclic-measure';
import { IMJOPMeasure } from './mjop-measure';

export interface IMJOPUnit {
	elementId: string;
	unitName: string; // Bouwdeel
	unitMaterial: string; //'Materiaal
	quantity: number; // Hoeveelheid
	quantityUnitOfMeasurement: string; // Eenheid
	derivedConditionScoreUnit?: IMJOPDerivedConditionScoreUnit;
	measures?: IMJOPMeasure[] | IMJOPCyclicMeasure[];
	elementName?: string; // Element
}
