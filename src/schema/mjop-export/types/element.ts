import { IUnit } from './unit';

export interface IElement {
	id: string;
	assetId: string;
	elementName?: string;
	units?: IUnit[];
	derivedConditionScoreElement?: IDerivedConditionScoreElement;
}
