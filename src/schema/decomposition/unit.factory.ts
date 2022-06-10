import { Unit } from './models/unit.model';
import { Unit as DomainUnit } from './types/unit.repository.interface';

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
		deleted_at: deletedAt,
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
		unit.deletedAt = deletedAt instanceof Date ? deletedAt.toUTCString() : null;
		return unit;
	}
}
