import { Prisma } from '@prisma/client';

import { DbObject as DomainObject } from './types/object.repository.interface';
import { ObjectModel } from './models/object.model';
import { CreateObjectInput } from './dto/create-object.input';

export class ObjectFactory {
	static CreateObject(domainObject: DomainObject | CreateObjectInput): ObjectModel {
		const object = new ObjectModel();
		object.id = domainObject.id;
		object.name = domainObject.name;
		object.code = domainObject.code;
		object.location = domainObject.location;
		object.latitude = Number(domainObject.latitude);
		object.longitude = Number(domainObject.longitude);
		object.updatedOn = domainObject.updatedOn instanceof Date ? domainObject.updatedOn.toUTCString() : null;
		object.compositionIsVisible = domainObject.compositionIsVisible;
		object.clientCompanyId = domainObject.clientCompanyId;
		object.operatorCompanyId = domainObject.operatorCompanyId;
		object.surveyorCompanyId = domainObject.surveyorCompanyId;
		object.objectTypeId = domainObject.objectTypeId;
		object.created_at = domainObject.created_at instanceof Date ? domainObject.created_at.toUTCString() : null;
		object.updated_at = domainObject.updated_at instanceof Date ? domainObject.updated_at.toUTCString() : null;
		object.inspectionStandardId = domainObject.inspectionStandardId;
		object.ownerCompanyId = domainObject.ownerCompanyId;
		object.customerVersion = domainObject.customerVersion;
		object.isPublic = domainObject.isPublic;
		object.isDemo = domainObject.isDemo;
		object.siteId = domainObject.siteId;
		object.constructionYear = domainObject.constructionYear;
		object.externalRefId = domainObject.externalRefId;
		object.useage = domainObject.useage;
		object.managementOrganization = domainObject.managementOrganization;
		// object.shape = domainObject.shape;
		object.shapeSrid = domainObject.shapeSrid;
		object.status = domainObject.status;
		object.effortCategory = domainObject.effortCategory;
		object.effortCalculation = domainObject.effortCalculation;
		object.trafficType = domainObject.trafficType;
		object.mainMaterial = domainObject.mainMaterial;
		object.marineInfrastrutureType = domainObject.marineInfrastrutureType;
		object.length = Number(domainObject.length);
		object.width = Number(domainObject.width);
		object.squareMeters = Number(domainObject.squareMeters);
		object.attributes = this.parsePrisma(domainObject.attributes);

		return object;
	}

	static parsePrisma(json: Prisma.JsonValue) {
		return JSON.parse(json as string);
	}
}
