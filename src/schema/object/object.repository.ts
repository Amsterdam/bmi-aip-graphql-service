import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';

import { DbObject, IObjectRepository } from './types/object.repository.interface';
import { ObjectModel } from './models/object.model';
import { CreateObjectInput } from './dto/create-object.input';

@Injectable()
export class ObjectRepository implements IObjectRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createObject(input: CreateObjectInput): Promise<ObjectModel> {
		const data: Prisma.objectsCreateInput = {
			id: input.id,
			name: input.name,
			code: input.code,
			location: input.location,
			updatedOn: input.updatedOn,
			created_at: input.created_at,
			updated_at: input.updated_at,
			attributes: input.attributes,
			status: input.status,
			customerVersion: input.customerVersion,
			inspectionStandards: {
				connect: {
					id: input.inspectionStandardId,
				},
			},
			compositionIsVisible: false,
			objectTypes: {
				connect: {
					id: input.objectTypeId,
				},
			},
		};

		const dbObject = await this.prisma.objects.create({ data });

		return this.transformToDto(dbObject);
	}

	async getObjectByObjectTypeId(objectTypeId: string): Promise<DbObject[]> {
		return this.prisma.objects.findMany({
			where: {
				objectTypeId,
			},
		});
	}

	private transformToDto(object: DbObject): ObjectModel {
		const objectModel = new ObjectModel();
		objectModel.id = object.id;
		objectModel.name = object.name;
		objectModel.code = object.code;
		objectModel.location = object.location;
		objectModel.latitude = object.latitude?.toNumber();
		objectModel.longitude = object.longitude?.toNumber();
		objectModel.updatedOn = object.updatedOn?.toUTCString();
		objectModel.compositionIsVisible = object.compositionIsVisible;
		objectModel.clientCompanyId = object.clientCompanyId;
		objectModel.operatorCompanyId = object.operatorCompanyId;
		objectModel.surveyorCompanyId = object.surveyorCompanyId;
		objectModel.objectTypeId = object.objectTypeId;
		objectModel.created_at = object.created_at?.toUTCString();
		objectModel.updated_at = object.updated_at?.toUTCString();
		objectModel.inspectionStandardId = object.inspectionStandardId;
		objectModel.ownerCompanyId = object.ownerCompanyId;
		objectModel.customerVersion = object.customerVersion;
		objectModel.isPublic = object.isPublic;
		objectModel.isDemo = object.isDemo;
		objectModel.siteId = object.siteId;
		objectModel.constructionYear = object.constructionYear;
		objectModel.externalRefId = object.externalRefId;
		objectModel.useage = object.useage;
		objectModel.managementOrganization = object.managementOrganization;
		objectModel.shapeSrid = object.shapeSrid;
		objectModel.status = object.status;
		objectModel.effortCategory = object.effortCategory;
		objectModel.effortCalculation = object.effortCalculation;
		objectModel.trafficType = object.trafficType;
		objectModel.mainMaterial = object.mainMaterial;
		objectModel.marineInfrastrutureType = object.marineInfrastrutureType;
		objectModel.length = object.length?.toNumber();
		objectModel.width = object.width?.toNumber();
		objectModel.squareMeters = object.squareMeters?.toNumber();
		objectModel.attributes = JSON.parse(JSON.stringify(object.attributes));

		return objectModel;
	}
}
