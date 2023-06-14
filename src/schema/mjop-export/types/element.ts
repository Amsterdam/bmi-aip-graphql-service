import { IUnit } from './unit';
import { IDerivedConditionScoreElement } from './derived-condition-score-element';

export interface IElement {
	id: string;
	assetId: string;
	elementName?: string;
	units?: IUnit[];
	derivedConditionScoreElement?: IDerivedConditionScoreElement;
}
