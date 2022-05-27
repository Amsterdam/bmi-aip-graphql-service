import { Element } from './models/element.model';
import { Element as DomainElement } from './types/element.repository.interface';

export class ElementFactory {
	static CreateElement({
		id,
		name,
		objectId,
		surveyId,
		gisibId,
		code,
		location,
		conditionId,
		observationPointId,
		constructionYear,
		constructionType,
		isElectrical,
		isElectricalObjectSpecific,
		isStructural,
		isStructuralObjectSpecific,
		isRelevant,
		categoryId,
		elementGroupName,
		isArchived,
	}: DomainElement): Element {
		const element = new Element();
		element.id = id;
		element.name = name;
		element.code = code;
		element.location = location;
		element.objectId = objectId;
		element.surveyId = surveyId;
		element.conditionId = conditionId;
		element.observationPointId = observationPointId;
		element.categoryId = categoryId;
		element.constructionYear = constructionYear;
		element.constructionType = constructionType;
		element.elementGroupName = elementGroupName;
		element.gisibId = gisibId;
		element.isElectrical = !!isElectrical;
		element.isElectricalObjectSpecific = !!isElectricalObjectSpecific;
		element.isStructural = !!isStructural;
		element.isStructuralObjectSpecific = !!isStructuralObjectSpecific;
		element.isRelevant = !!isRelevant;
		element.isArchived = !!isArchived;
		return element;
	}
}
