import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Point } from 'geojson';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { Luminaire, ILuminaireRepository } from './types/luminaire.repository.interface';
import { CreateLuminaireInput } from './dto/create-luminaire.input';
import { UpdateLuminaireInput } from './dto/update-luminaire.input';

@Injectable()
export class LuminaireRepository implements ILuminaireRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createLuminaire({
		supportSystemId,
		name,
		location,
		hasLED,
		constructionYear,
		supplierType,
		manufacturer,
		remarks,
		geography,
		geographyRD,
		driverSupplierType,
		driverCommissioningDate,
		lightSupplierType,
		lightCommissioningDate,
		remarksRevision,
	}: CreateLuminaireInput): Promise<Luminaire> {
		const luminaireId = newId();
		const data: Prisma.spanLuminairesCreateInput = {
			id: luminaireId,
			spanSupportSystems: { connect: { id: supportSystemId } },
			name,
			location,
			hasLED,
			constructionYear,
			supplierType,
			manufacturer,
			remarks,
			remarksRevision,
			driverSupplierType,
			driverCommissioningDate,
			lightSupplierType,
			lightCommissioningDate,
			geographyRD: {
				...geographyRD,
			},
			permanentId: luminaireId,
		};

		const luminaire = await this.prisma.spanLuminaires.create({ data });

		// Work around Prisma not supporting spatial data types
		if (geography) {
			await this.prisma.$executeRaw`
				UPDATE "spanLuminaires"
				SET geography = ST_GeomFromGeoJSON(${JSON.stringify(geography)})
				WHERE id = ${luminaire.id}
			`;
		}
		return {
			...luminaire,
			geography,
		};
	}

	async getLuminaires(supportSystemId: string): Promise<Luminaire[]> {
		const luminaires = (await this.prisma.spanLuminaires.findMany({
			where: {
				supportSystemId,
				deleted_at: null,
			},
		})) as Luminaire[];

		return Promise.all(
			luminaires.map(async (luminaire) => {
				luminaire.geography = await this.getGeographyAsGeoJSON(luminaire.id);
				return luminaire;
			}),
		);
	}

	async updateLuminaire({
		id,
		name,
		location,
		hasLED,
		constructionYear,
		supplierType,
		manufacturer,
		remarks,
		geography,
		geographyRD,
		driverSupplierType,
		driverCommissioningDate,
		lightSupplierType,
		lightCommissioningDate,
		remarksRevision,
	}: UpdateLuminaireInput): Promise<Luminaire> {
		const data: Prisma.spanLuminairesUpdateInput = {
			name,
			location,
			hasLED,
			constructionYear,
			supplierType,
			manufacturer,
			remarks,
			remarksRevision,
			driverSupplierType,
			driverCommissioningDate,
			lightSupplierType,
			lightCommissioningDate,
			geographyRD: {
				...geographyRD,
			},
		};

		// Work around Prisma not supporting spatial data types
		if (geography) {
			await this.prisma.$executeRaw`
				UPDATE "spanLuminaires"
				SET geography = ST_GeomFromGeoJSON(${JSON.stringify(geography)})
				WHERE id = ${id}
			`;
		}

		const luminaire = await this.prisma.spanLuminaires.update({
			where: { id },
			data,
		});

		// Work around Prisma not supporting spatial data types
		return { ...luminaire, geography: await this.getGeographyAsGeoJSON(id) };
	}

	async deleteLuminaire(identifier: string): Promise<Luminaire> {
		const data: Prisma.spanLuminairesUpdateInput = {
			deleted_at: new Date(),
		};

		const luminaire = await this.prisma.spanLuminaires.update({
			where: { id: identifier },
			data,
		});

		// Work around Prisma not supporting spatial data types
		return { ...luminaire, geography: await this.getGeographyAsGeoJSON(identifier) };
	}

	async getGeographyAsGeoJSON(identifier: string): Promise<Point | null> {
		const result = await this.prisma.$queryRaw<{ geography?: Point | null }>`
			SELECT ST_AsGeoJSON(geography) as geography
			FROM "spanLuminaires"
			WHERE id = ${identifier};
		`;
		const geography = result?.[0]?.geography;
		return geography ? JSON.parse(geography) : null;
	}

	async deleteLuminairesForSupportSystem(supportSystemId: string): Promise<void> {
		const luminaires = await this.prisma.spanLuminaires.findMany({
			where: {
				supportSystemId,
			},
			select: {
				id: true,
			},
		});
		await Promise.all(luminaires.map(({ id }) => this.deleteLuminaire(id)));
	}
}
