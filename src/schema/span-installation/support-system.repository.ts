import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Point } from 'geojson';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { SupportSystem, ISupportSystemRepository } from './types/support-system.repository.interface';
import { CreateSupportSystemInput } from './dto/create-support-system.input';
import { UpdateSupportSystemInput } from './dto/update-support-system.input';
import { LuminaireRepository } from './luminaire.repository';

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
		remarks,
		constructionYear,
		houseNumber,
		type,
		typeDetailed,
		geography,
	}: CreateSupportSystemInput): Promise<SupportSystem> {
		const data: Prisma.spanSupportSystemsCreateInput = {
			id: newId(),
			objects: { connect: { id: objectId } },
			surveys: { connect: { id: surveyId } },
			name,
			location,
			locationIndication,
			a11yDetails,
			installationHeight,
			remarks,
			constructionYear,
			houseNumber,
			type: '',
			typeDetailed: '',
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
		return this.prisma.spanSupportSystems.findMany({
			where: {
				surveyId,
			},
		});
	}

	async updateSupportSystem({
		id,
		name,
		location,
		locationIndication,
		a11yDetails,
		installationHeight,
		remarks,
		constructionYear,
		houseNumber,
		type,
		typeDetailed,
		geography,
	}: UpdateSupportSystemInput): Promise<SupportSystem> {
		const data: Prisma.spanSupportSystemsUpdateInput = {
			name,
			location,
			locationIndication,
			a11yDetails,
			installationHeight,
			remarks,
			constructionYear,
			houseNumber,
			type,
			typeDetailed,
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
}
