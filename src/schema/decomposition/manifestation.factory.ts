import { Manifestation } from './models/graphql/manifestation.model';
import { Manifestation as DomainManifestation } from './types/manifestation.repository.interface';

export class ManifestationFactory {
	static CreateManifestation({
		id,
		name,
		code,
		location,
		objectId,
		surveyId,
		elementId,
		unitId,
		conditionId,
		observationPointId,
		material,
		quantity,
		quantityUnitOfMeasurement,
		constructionYear,
	}: DomainManifestation): Manifestation {
		const manifestation = new Manifestation();
		manifestation.id = id;
		manifestation.name = name;
		manifestation.code = code;
		manifestation.location = location;
		manifestation.objectId = objectId;
		manifestation.surveyId = surveyId;
		manifestation.elementId = elementId;
		manifestation.unitId = unitId;
		manifestation.conditionId = conditionId;
		manifestation.observationPointId = observationPointId;
		manifestation.material = material;
		manifestation.quantity = quantity;
		manifestation.quantityUnitOfMeasurement = quantityUnitOfMeasurement;
		manifestation.constructionYear = constructionYear;
		return manifestation;
	}
}
