import { IDerivedConditionScoreUnit } from './Derived-condition-score-unit';
import { ICyclicMeasure } from './cyclic-measure';
import { IMeasure } from './measure';

export interface IUnit {
	elementId: string;
	unitName: string; //'Bouwdeel'
	unitMaterial: string; //'Materiaal'
	quantity: number; //'Hoeveelheid'
	quantityUnitOfMeasurement: string; //'Eenheid'
	derivedConditionScoreUnit?: IDerivedConditionScoreUnit;
	measures?: IMeasure[] | ICyclicMeasure[];
}
