import { GisibElement } from '../../gisib/types/GisibElement';
import { GisibFeature } from '../../gisib/types/GisibFeature';

import { Element } from './models/element.model';
import { Element as DomainElement } from './types/element.repository.interface';
import { CreateElementInput } from './dto/create-element.input';

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
		deleted_at: deletedAt,
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
		element.deletedAt = deletedAt instanceof Date ? deletedAt.toUTCString() : null;
		return element;
	}

	/**
	 * TODO Once a decision is made on the role GISIB will play in relation to AIP this can be refined/completed
	 * @see https://teambmi.atlassian.net/wiki/spaces/TB/pages/1413021697/AIP+Decomposition+-+GISIB+mapping
	 */
	static CreateElementInput(
		objectId: string,
		surveyId: string,
		{ properties }: GisibFeature<GisibElement>,
	): CreateElementInput {
		const element = new CreateElementInput();
		element.objectId = objectId;
		element.surveyId = surveyId;
		element.gisibId = properties.Id;
		element.name = properties['NEN Type element'].Description;
		element.code = properties.Code;
		return element;
	}
}
