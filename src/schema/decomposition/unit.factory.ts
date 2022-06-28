import { GisibUnit } from '../../gisib/types/GisibUnit';
import { GisibFeature } from '../../gisib/types/GisibFeature';

import { Unit } from './models/unit.model';
import { Unit as DomainUnit } from './types/unit.repository.interface';
import { CreateUnitInput } from './dto/create-unit.input';

export class UnitFactory {
	static CreateUnit({
		id,
		name,
		code,
		location,
		objectId,
		surveyId,
		elementId,
		conditionId,
		observationPointId,
		material,
		quantity,
		quantityUnitOfMeasurement,
		constructionYear,
		gisibId,
		isElectrical,
		isElectricalObjectSpecific,
		isStructural,
		isStructuralObjectSpecific,
		isRelevant,
	}: DomainUnit): Unit {
		const unit = new Unit();
		unit.id = id;
		unit.name = name;
		unit.code = code;
		unit.location = location;
		unit.objectId = objectId;
		unit.surveyId = surveyId;
		unit.elementId = elementId;
		unit.conditionId = conditionId;
		unit.observationPointId = observationPointId;
		unit.material = material;
		unit.quantity = quantity;
		unit.quantityUnitOfMeasurement = quantityUnitOfMeasurement;
		unit.constructionYear = constructionYear;
		unit.gisibId = gisibId;
		unit.isElectrical = !!isElectrical;
		unit.isElectricalObjectSpecific = !!isElectricalObjectSpecific;
		unit.isStructural = !!isStructural;
		unit.isStructuralObjectSpecific = !!isStructuralObjectSpecific;
		unit.isRelevant = !!isRelevant;
		return unit;
	}

	/**
	 * TODO Once a decision is made on the role GISIB will play in relation to AIP this can be refined/completed
	 * @see https://teambmi.atlassian.net/wiki/spaces/TB/pages/1413021697/AIP+Decomposition+-+GISIB+mapping
	 */
	static CreateUnitInput(
		objectId: string,
		surveyId: string,
		elementId: string,
		{ properties }: GisibFeature<GisibUnit>,
	): CreateUnitInput {
		const unit = new CreateUnitInput();
		unit.objectId = objectId;
		unit.surveyId = surveyId;
		unit.gisibId = properties.Id;
		unit.elementId = elementId;
		unit.name = properties['NEN Type bouwdeel'].Description;
		unit.code = properties.Code;
		return unit;
	}
}
