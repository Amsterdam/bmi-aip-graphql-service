import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import PQueue from 'p-queue';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { DbObject, IObjectRepository } from './types/object.repository.interface';
import { ObjectModel } from './models/object.model';
import { CreateObjectInput } from './dto/create-object.input';

@Injectable()
export class ObjectRepository implements IObjectRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createObject(input: CreateObjectInput): Promise<ObjectModel> {
		const data: Prisma.objectsCreateInput = {
			id: newId(),
			name: input.name,
			code: input.code,
			location: input.location,
			updatedOn: input.updatedOn,
			attributes: input.attributes,
			status: input.status,
			companies_companiesToobjects_clientCompanyId: {
				connect: {
					id: input.clientCompanyId,
				},
			},
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

	async undoOVSImport(): Promise<string> {
		try {
			await this.prisma.$queryRaw`TRUNCATE TABLE "spanLuminaires" CASCADE;`;
			await this.prisma.$queryRaw`TRUNCATE TABLE "spanSupportSystems" CASCADE;`;
			await this.prisma.$queryRaw`TRUNCATE TABLE "spanJunctionBoxes" CASCADE;`;

			// Surveys
			const ovsSurveys = await this.prisma.surveys.findMany({
				select: {
					id: true,
				},
				where: {
					description: 'Contract 1',
					inspectionStandardType: 'spanInstallation',
				},
			});
			const queue = new PQueue({ concurrency: 10 });
			ovsSurveys.forEach(({ id }) => {
				queue.add(() =>
					this.prisma.auditEvents.deleteMany({
						where: {
							surveyId: id,
						},
					}),
				);
			});
			await queue.onIdle();

			await this.prisma.surveys.deleteMany({
				where: {
					description: 'Contract 1',
					inspectionStandardType: 'spanInstallation',
				},
			});
			// await this.prisma
			// 	.$queryRaw`DELETE FROM "surveys" WHERE "description" = 'Contract 1' AND "inspectionStandardType" = 'spanInstallation'`;

			// Objects
			const ovsObjects = await this.prisma.objects.findMany({
				select: {
					id: true,
				},
				where: {
					objectTypeId: 'd728c6da-6320-4114-ae1d-7cbcc4b8c2a0',
				},
			});
			ovsObjects.forEach(({ id }) => {
				queue.add(() =>
					this.prisma.auditEvents.deleteMany({
						where: {
							objectId: id,
						},
					}),
				);
			});
			await queue.onIdle();

			await this.prisma.objects.deleteMany({
				where: {
					objectTypeId: 'd728c6da-6320-4114-ae1d-7cbcc4b8c2a0',
				},
			});
			// await this.prisma
			// 	.$queryRaw`DELETE FROM "objects" WHERE "code" LIKE 'OVS%' AND "objectTypeId" = 'd728c6da-6320-4114-ae1d-7cbcc4b8c2a0'`;
			console.log('Undid import');
			return 'SUCCESS';
		} catch (err) {
			console.error('Failed to undo import', err);
			return err.message;
		}
	}
}
