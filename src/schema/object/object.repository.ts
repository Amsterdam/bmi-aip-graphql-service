import { Prisma } from '@prisma/client';
import { Injectable, Logger } from '@nestjs/common';
import PQueue from 'p-queue';
import { Point } from 'geojson';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';
import { transformRDToWGS } from '../span-installation/utils/transformRD';

import { DbObject, IObjectRepository } from './types/object.repository.interface';
import { ObjectModel } from './models/object.model';
import { CreateObjectInput } from './dto/create-object.input';
import { UpdateObjectInput } from './dto/update-object.input';
import { CorrectCoordinatesInput } from './dto/correct-coordinates.input';

@Injectable()
export class ObjectRepository implements IObjectRepository {
	public constructor(private readonly prisma: PrismaService, private logger: Logger) {}

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

	async updatePassportByObjectCode(input: UpdateObjectInput): Promise<string> {
		try {
			const code = 'OVS' + ('000' + input.code).slice(-4);

			await this.prisma.$executeRaw`
				UPDATE "objects"
				SET attributes = ${input.attributes}
				WHERE code = ${code}
			`;
		} catch (err) {
			return err.message;
		}

		return 'SUCCESS';
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

	public async removeDuplicateInstallationGroup(
		installationGroupId: number,
		targetRemoved?: boolean,
	): Promise<boolean> {
		const name = `OVS${installationGroupId}`;
		const objects = await this.prisma.objects.findMany({ where: { name: name } });

		if (objects.length < 2) {
			this.logger.log(`There are no duplicates for installation group with ID ${installationGroupId}`);
			return false;
		}

		for (const key in objects) {
			const object = objects[key];
			this.logger.log(`ID: ${object.id}`);

			if (targetRemoved && object.status === 'deleted') {
				await this.removeObjectAndDependencies(object);
				this.logger.log(`Removed deleted object ${object.id} for installation group with name ${name}`);
				break;
			}

			if (!targetRemoved && parseInt(key) > 0) {
				await this.removeObjectAndDependencies(object);
				this.logger.log(`Removed duplicate object ${object.id} for installation group with name ${name}`);
			}
		}

		return true;
	}

	private async removeObjectAndDependencies(object: DbObject) {
		const surveyIds = [];
		const junctionBoxIds = [];
		const supportSystemIds = [];
		const luminaireIds = [];
		const auditEventIds = [];

		const surveys = await this.prisma.surveys.findMany({ where: { objectId: object.id } });
		surveys.map((survey) => {
			surveyIds.push(survey.id);
		});

		const junctionBoxes = await this.prisma.spanJunctionBoxes.findMany({ where: { objectId: object.id } });
		junctionBoxes.map((junctionBox) => {
			junctionBoxIds.push(junctionBox.id);
		});

		const supportSystems = await this.prisma.spanSupportSystems.findMany({
			where: { objectId: object.id },
		});
		supportSystems.map((supportSystem) => {
			supportSystemIds.push(supportSystem.id);
		});

		const auditEvents = await this.prisma.auditEvents.findMany({
			where: { objectId: object.id },
		});
		auditEvents.map((auditEvent) => {
			auditEventIds.push(auditEvent.id);
		});

		if (supportSystems.length > 0) {
			const luminaires = await this.prisma.spanLuminaires.findMany({
				where: { supportSystemId: { in: supportSystemIds } },
			});
			luminaires.map((luminaire) => {
				luminaireIds.push(luminaire.id);
			});
		}

		this.logger.log(`Object with ID ${object.id} is a duplicate. Will attempt to remove dependencies`);

		try {
			if (luminaireIds.length > 0) {
				const deletedLuminaires = await this.prisma.spanLuminaires.deleteMany({
					where: { id: { in: luminaireIds } },
				});
				this.logger.log(`Deleted luminaires for duplicate object:  ${deletedLuminaires.count}`);
			}

			if (junctionBoxIds.length > 0) {
				const deletedJunctionBoxes = await this.prisma.spanJunctionBoxes.deleteMany({
					where: { id: { in: junctionBoxIds } },
				});
				this.logger.log(`Deleted junction boxes for duplicate object: ${deletedJunctionBoxes.count}`);
			}

			if (supportSystemIds.length > 0) {
				const deletedSupportSystems = await this.prisma.spanSupportSystems.deleteMany({
					where: { id: { in: supportSystemIds } },
				});
				this.logger.log(`Deleted support systems for duplicate object: ${deletedSupportSystems.count}`);
			}

			if (auditEventIds.length > 0) {
				const deletedAuditEvents = await this.prisma.auditEvents.deleteMany({
					where: { id: { in: auditEventIds } },
				});
				this.logger.log(`Deleted audit events for duplicate object: ${deletedAuditEvents.count}`);
			}

			if (surveyIds.length > 0) {
				const deletedSurveys = await this.prisma.surveys.deleteMany({
					where: { id: { in: surveyIds } },
				});
				this.logger.log(`Deleted surveys for duplicate object: ${deletedSurveys.count}`);
			}

			await this.prisma.objects.delete({ where: { id: object.id } });
			this.logger.log(`Deleted duplicate object with ID ${object.id}`);
		} catch (e) {
			this.logger.log(`Failed to remove dependencies, error: ${e.message}`);
		}
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

	async correctCoordinates(input: CorrectCoordinatesInput): Promise<string> {
		const { installationGroup, source } = input;

		try {
			const name = 'OVS' + ('000' + installationGroup).slice(-4);
			const object: DbObject = await this.prisma.objects.findFirst({ where: { name } });

			await Promise.all(
				source.junctionBoxes.map(async (jb, idx) => {
					const { X, Y } = jb;

					const geography: Point = {
						type: 'Point',
						coordinates: transformRDToWGS([Number(X), Number(Y)]),
					};

					const data: Prisma.objectsUpdateInput = {
						longitude: geography.coordinates[0],
						latitude: geography.coordinates[1],
					};

					//Update objects latitude and longitude
					await this.prisma.objects.update({
						where: { id: object.id },
						data,
					});
				}),
			);
		} catch (err) {
			return err.message;
		}

		return 'SUCCESS';
	}
}
