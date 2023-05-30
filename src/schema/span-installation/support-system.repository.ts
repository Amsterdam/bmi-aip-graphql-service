import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Point } from 'geojson';
import PQueue from 'p-queue';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { SupportSystem, ISupportSystemRepository } from './types/support-system.repository.interface';
import { LuminaireRepository } from './luminaire.repository';
import { CreateSupportSystemNormalizedInput } from './dto/create-support-system-normalized.input';
import { UpdateSupportSystemNormalizedInput } from './dto/update-support-system-normalized.input';
import { ReviseSupportSystemNormalizedInput } from './dto/revise-support-system-normalized.input';
import { CreateMissingSupportSystemNormalizedInput } from './dto/create-missing-support-system-normalized.input';

@Injectable()
export class SupportSystemRepository implements ISupportSystemRepository {
	public constructor(private readonly prisma: PrismaService, private readonly luminaireRepo: LuminaireRepository) {}

	async createSupportSystem({
		objectId,
		surveyId,
		name,
		location,
		locationIndication,
		a11yDetails,
		installationHeight,
		installationLength,
		remarks,
		constructionYear,
		houseNumber,
		type,
		typeDetailed,
		geography,
		geographyRD,
	}: CreateSupportSystemNormalizedInput): Promise<SupportSystem> {
		const supportSystemId = newId();
		const data: Prisma.spanSupportSystemsCreateInput = {
			id: supportSystemId,
			objects: { connect: { id: objectId } },
			surveys: { connect: { id: surveyId } },
			name,
			location,
			locationIndication,
			a11yDetails: a11yDetails as Prisma.InputJsonObject,
			installationHeight,
			installationLength,
			remarks,
			constructionYear,
			houseNumber,
			type: type,
			typeDetailed: typeDetailed,
			geographyRD: {
				...geographyRD,
			},
			permanentId: supportSystemId,
		};

		const supportSystem = await this.prisma.spanSupportSystems.create({ data });

		// Work around Prisma not supporting spatial data types
		await this.prisma.$executeRaw`
			UPDATE "spanSupportSystems"
			SET geography = ST_GeomFromGeoJSON(${JSON.stringify(geography)})
			WHERE id = ${supportSystem.id}
		`;

		return {
			...supportSystem,
			geography,
		};
	}

	async createMissingSupportSystem({
		objectId,
		surveyId,
		name,
		location,
		locationIndication,
		a11yDetails,
		installationHeight,
		installationLength,
		remarks,
		constructionYear,
		houseNumber,
		type,
		typeDetailed,
		geography,
		geographyRD,
		remarksRevision,
	}: CreateMissingSupportSystemNormalizedInput): Promise<SupportSystem> {
		const supportSystemId = newId();
		const data: Prisma.spanSupportSystemsCreateInput = {
			id: supportSystemId,
			objects: { connect: { id: objectId } },
			surveys: { connect: { id: surveyId } },
			name,
			location,
			locationIndication,
			a11yDetails: a11yDetails as Prisma.InputJsonObject,
			installationHeight,
			installationLength,
			remarks,
			remarksRevision,
			constructionYear,
			houseNumber,
			type: type,
			typeDetailed: typeDetailed,
			geographyRD: {
				...geographyRD,
			},
			permanentId: supportSystemId,
		};

		const supportSystem = await this.prisma.spanSupportSystems.create({ data });

		// Work around Prisma not supporting spatial data types
		await this.prisma.$executeRaw`
			UPDATE "spanSupportSystems"
			SET geography = ST_GeomFromGeoJSON(${JSON.stringify(geography)})
			WHERE id = ${supportSystem.id}
		`;

		return {
			...supportSystem,
			geography,
		};
	}

	async getSupportSystems(surveyId: string): Promise<SupportSystem[]> {
		const supportSystems = (await this.prisma.spanSupportSystems.findMany({
			where: {
				surveyId,
				deleted_at: null,
			},
		})) as SupportSystem[];

		return Promise.all(
			supportSystems.map(async (supportSystem) => {
				supportSystem.geography = await this.getGeographyAsGeoJSON(supportSystem.id);
				return supportSystem;
			}),
		);
	}

	async updateSupportSystem({
		id,
		name,
		location,
		locationIndication,
		a11yDetails,
		installationHeight,
		installationLength,
		remarks,
		constructionYear,
		houseNumber,
		type,
		typeDetailed,
		geography,
		geographyRD,
	}: UpdateSupportSystemNormalizedInput): Promise<SupportSystem> {
		const data: Prisma.spanSupportSystemsUpdateInput = {
			name,
			location,
			locationIndication,
			a11yDetails: {
				...a11yDetails,
			},
			installationHeight,
			installationLength,
			remarks,
			constructionYear,
			houseNumber,
			type,
			typeDetailed,
			geographyRD: {
				...geographyRD,
			},
		};

		// Work around Prisma not supporting spatial data types
		if (geography) {
			await this.prisma.$executeRaw`
				UPDATE "spanSupportSystems"
				SET geography = ST_GeomFromGeoJSON(${JSON.stringify(geography)})
				WHERE id = ${id}
			`;
		}

		const supportSystem = await this.prisma.spanSupportSystems.update({
			where: { id },
			data,
		});

		// Work around Prisma not supporting spatial data types
		return { ...supportSystem, geography: await this.getGeographyAsGeoJSON(id) };
	}

	async reviseSupportSystem({
		id,
		name,
		location,
		locationIndication,
		a11yDetails,
		installationHeight,
		installationLength,
		remarks,
		constructionYear,
		houseNumber,
		type,
		typeDetailed,
		geography,
		geographyRD,
		remarksRevision,
	}: ReviseSupportSystemNormalizedInput): Promise<SupportSystem> {
		const data: Prisma.spanSupportSystemsUpdateInput = {
			name,
			location,
			locationIndication,
			a11yDetails: {
				...a11yDetails,
			},
			installationHeight,
			installationLength,
			remarks,
			remarksRevision,
			constructionYear,
			houseNumber,
			type,
			typeDetailed,
			geographyRD: {
				...geographyRD,
			},
		};

		// Work around Prisma not supporting spatial data types
		if (geography) {
			await this.prisma.$executeRaw`
				UPDATE "spanSupportSystems"
				SET geography = ST_GeomFromGeoJSON(${JSON.stringify(geography)})
				WHERE id = ${id}
			`;
		}

		const supportSystem = await this.prisma.spanSupportSystems.update({
			where: { id },
			data,
		});

		// Work around Prisma not supporting spatial data types
		return { ...supportSystem, geography: await this.getGeographyAsGeoJSON(id) };
	}

	async deleteSupportSystem(identifier: string): Promise<SupportSystem> {
		const data: Prisma.spanSupportSystemsUpdateInput = {
			deleted_at: new Date(),
		};

		await this.luminaireRepo.deleteLuminairesForSupportSystem(identifier);

		const supportSystem = await this.prisma.spanSupportSystems.update({
			where: { id: identifier },
			data,
		});

		// Work around Prisma not supporting spatial data types
		return { ...supportSystem, geography: await this.getGeographyAsGeoJSON(identifier) };
	}

	async getGeographyAsGeoJSON(identifier: string): Promise<Point | null> {
		const result = await this.prisma.$queryRaw<{ geography?: Point | null }>`
			SELECT ST_AsGeoJSON(geography) as geography
			FROM "spanSupportSystems"
			WHERE id = ${identifier};
		`;
		const geography = result?.[0]?.geography;
		return geography ? JSON.parse(geography) : null;
	}

	async getLuminaireGeographyAsGeoJSON(identifier: string): Promise<Point | null> {
		const result = await this.prisma.$queryRaw<{ geography?: Point | null }>`
			SELECT ST_AsGeoJSON(geography) as geography
			FROM "spanLuminaires"
			WHERE id = ${identifier};
		`;
		const geography = result?.[0]?.geography;
		return geography ? JSON.parse(geography) : null;
	}

	private async duplicateLuminairesForSupportSystem(supportSystemId: string, newSupportSystemtId: string) {
		const luminaires = await this.prisma.spanLuminaires.findMany({
			where: {
				supportSystemId,
			},
		});

		const queue = new PQueue({ concurrency: 1 });
		luminaires.forEach((luminaire) => {
			queue.add(async () => {
				const newLuminaireId = newId();
				// Duplicate luminaire record but with new id and different supportSystemId
				await this.prisma.spanLuminaires.create({
					data: {
						...luminaire,
						id: newLuminaireId,
						supportSystemId: newSupportSystemtId,
						permanentId: luminaire.id,
					},
				});
				// Work around Prisma not supporting spatial data types
				const geography = await this.getLuminaireGeographyAsGeoJSON(luminaire.id);
				if (geography) {
					await this.prisma.$executeRaw`
						UPDATE "spanLuminaires"
						SET geography = ST_GeomFromGeoJSON(${JSON.stringify(geography)})
						WHERE id = ${newLuminaireId}
					`;
				}
			});
		});
		await queue.onIdle();
	}

	public async cloneSupportSystems(surveyId: string, ovsSurveyId: string): Promise<SupportSystem[]> {
		const supportSystems = await this.prisma.spanSupportSystems.findMany({
			where: {
				surveyId: ovsSurveyId,
			},
		});

		const queue = new PQueue({ concurrency: 1 });
		supportSystems.forEach((supportSystem) => {
			queue.add(async () => {
				const newSupportSystemtId = newId();
				// Duplicate support system record but with new id and different surveyId
				await this.prisma.spanSupportSystems.create({
					data: {
						...supportSystem,
						id: newSupportSystemtId,
						surveyId,
						permanentId: supportSystem.id,
					},
				});
				// Duplicate luminaires for support system
				await this.duplicateLuminairesForSupportSystem(supportSystem.id, newSupportSystemtId);
				// Work around Prisma not supporting spatial data types
				const geography = await this.getGeographyAsGeoJSON(supportSystem.id);
				if (geography) {
					await this.prisma.$executeRaw`
						UPDATE "spanSupportSystems"
						SET geography = ST_GeomFromGeoJSON(${JSON.stringify(geography)})
						WHERE id = ${newSupportSystemtId}
					`;
				}
			});
		});

		await queue.onIdle();

		return this.getSupportSystems(surveyId);
	}
}
