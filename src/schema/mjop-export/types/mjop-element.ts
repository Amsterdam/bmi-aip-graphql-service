import { IMJOPUnit } from './mjop-unit';
import { IMJOPDerivedConditionScoreElement } from './mjop-derived-condition-score-element';

export interface IMJOPElement {
	id: string;
	assetId: string;
	elementName?: string;
	units?: IMJOPUnit[];
	derivedConditionScoreElement?: IMJOPDerivedConditionScoreElement;
}
