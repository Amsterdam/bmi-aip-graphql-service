import { Prisma } from '@prisma/client';

import { DbObject as DomainObject } from './types/object.repository.interface';
import { CreateObjectInput } from './dto/create-object.input';

export class ObjectFactory {
	static CreateObject({
		id,
		name,
		code,
		location,
		// latitude,
		// longitude,
		updatedOn,
		compositionIsVisible,
		clientCompanyId,
		operatorCompanyId,
		surveyorCompanyId,
		objectTypeId,
		created_at,
		updated_at,
		inspectionStandardId,
		ownerCompanyId,
		customerVersion,
		isPublic,
		isDemo,
		siteId,
		constructionYear,
		externalRefId,
		useage,
		managementOrganization,
		// shape,
		shapeSrid,
		status,
		effortCategory,
		effortCalculation,
		trafficType,
		mainMaterial,
		marineInfrastrutureType,
		// length,
		// width,
		// squareMeters,
		attributes,
	}: DomainObject): CreateObjectInput {
		const object = new CreateObjectInput();
		object.id = id;
		object.name = name;
		object.code = code;
		object.location = location;
		// object.latitude = Number(latitude);
		// object.longitude = Number(longitude);
		object.updatedOn = updatedOn instanceof Date ? updatedOn.toUTCString() : null;
		object.compositionIsVisible = compositionIsVisible;
		object.clientCompanyId = clientCompanyId;
		object.operatorCompanyId = operatorCompanyId;
		object.surveyorCompanyId = surveyorCompanyId;
		object.objectTypeId = objectTypeId;
		object.created_at = created_at instanceof Date ? created_at.toUTCString() : null;
		object.updated_at = updated_at instanceof Date ? updated_at.toUTCString() : null;
		object.inspectionStandardId = inspectionStandardId;
		object.ownerCompanyId = ownerCompanyId;
		object.customerVersion = customerVersion;
		object.isPublic = isPublic;
		object.isDemo = isDemo;
		object.siteId = siteId;
		object.constructionYear = constructionYear;
		object.externalRefId = externalRefId;
		object.useage = useage;
		object.managementOrganization = managementOrganization;
		// object.shape = shape;
		object.shapeSrid = shapeSrid;
		object.status = status;
		object.effortCategory = effortCategory;
		object.effortCalculation = effortCalculation;
		object.trafficType = trafficType;
		object.mainMaterial = mainMaterial;
		object.marineInfrastrutureType = marineInfrastrutureType;
		// object.length = length;
		// object.width = width;
		// object.squareMeters = squareMeters;
		object.attributes = this.parsePrisma(attributes);

		return object;
	}

	static parsePrisma(json: Prisma.JsonValue) {
		return JSON.parse(json as string);
	}

	// static createMany(input: CreateObjectInput[]) {
	// 	return input;
	// }
}
