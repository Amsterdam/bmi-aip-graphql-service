import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Point } from 'geojson';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { JunctionBox, IJunctionBoxRepository } from './types/junction-box.repository.interface';
import { CreateJunctionBoxInput } from './dto/create-junction-box.input';
import { UpdateJunctionBoxInput } from './dto/update-junction-box.input';

@Injectable()
export class JunctionBoxRepository implements IJunctionBoxRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createJunctionBox({
		objectId,
		surveyId,
		name,
		mastNumber,
		location,
		locationIndication,
		a11yDetails,
		installationHeight,
		riserTubeVisible,
		remarks,
		geography,
		createdAt,
	}: CreateJunctionBoxInput): Promise<JunctionBox> {
		const data: Prisma.spanJunctionBoxesCreateInput = {
			id: newId(),
			objects: { connect: { id: objectId } },
			surveys: { connect: { id: surveyId } },
			name,
			mastNumber,
			location,
			locationIndication,
			a11yDetails: a11yDetails as Prisma.InputJsonObject,
			installationHeight,
			riserTubeVisible,
			remarks,
		};

		const junctionBox = await this.prisma.spanJunctionBoxes.create({ data });

		// Work around Prisma not supporting spatial data types
		if (geography) {
			await this.prisma.$executeRaw`
				UPDATE "spanJunctionBoxes"
				SET geography = ST_GeomFromGeoJSON(${JSON.stringify(geography)})
				WHERE id = ${junctionBox.id}
			`;
		}

		return {
			...junctionBox,
			geography,
		};
	}

	async getJunctionBoxes(surveyId: string): Promise<JunctionBox[]> {
		const junctionBoxes = (await this.prisma.spanJunctionBoxes.findMany({
			where: {
				surveyId,
				deleted_at: null,
			},
		})) as JunctionBox[];

		return Promise.all(
			junctionBoxes.map(async (junctionBox) => {
				junctionBox.geography = await this.getGeographyAsGeoJSON(junctionBox.id);
				return junctionBox;
			}),
		);
	}

	async updateJunctionBox({
		id,
		name,
		mastNumber,
		location,
		locationIndication,
		a11yDetails,
		installationHeight,
		riserTubeVisible,
		remarks,
		geography,
		geographyRD,
	}: UpdateJunctionBoxInput): Promise<JunctionBox> {
		const data: Prisma.spanJunctionBoxesUpdateInput = {
			name,
			mastNumber,
			location,
			locationIndication,
			a11yDetails: {
				...a11yDetails,
			},
			installationHeight,
			riserTubeVisible,
			remarks,
		};

		// Work around Prisma not supporting spatial data types
		if (geography) {
			await this.prisma.$executeRaw`
				UPDATE "spanJunctionBoxes"
				SET geography = ST_GeomFromGeoJSON(${JSON.stringify(geography)})
				WHERE id = ${id}
			`;
		}

		if (geographyRD) {
			await this.prisma.$executeRaw`
				UPDATE "spanJunctionBoxes"
				SET geographyRD = ST_GeomFromGeoJSON(${JSON.stringify(geographyRD)})
				WHERE id = ${id}
			`;
		}

		const junctionBox = await this.prisma.spanJunctionBoxes.update({
			where: { id },
			data,
		});

		// Work around Prisma not supporting spatial data types
		return {
			...junctionBox,
			geography: await this.getGeographyAsGeoJSON(id),
			geographyRD: await this.getGeographyRDAsGeoJSON(id),
		};
	}

	async deleteJunctionBox(identifier: string): Promise<JunctionBox> {
		const data: Prisma.spanJunctionBoxesUpdateInput = {
			deleted_at: new Date(),
		};

		const junctionBox = await this.prisma.spanJunctionBoxes.update({
			where: { id: identifier },
			data,
		});

		// Work around Prisma not supporting spatial data types
		return {
			...junctionBox,
			geography: await this.getGeographyAsGeoJSON(identifier),
			geographyRD: await this.getGeographyRDAsGeoJSON(identifier),
		};
	}

	async getGeographyAsGeoJSON(identifier: string): Promise<Point | null> {
		const result = await this.prisma.$queryRaw<{ geography?: Point | null }>`
			SELECT ST_AsGeoJSON(geography) as geography
			FROM "spanJunctionBoxes"
			WHERE id = ${identifier};
		`;
		const geography = result?.[0]?.geography;
		return geography ? JSON.parse(geography) : null;
	}

	async getGeographyRDAsGeoJSON(identifier: string): Promise<Point | null> {
		const result = await this.prisma.$queryRaw<{ geography?: Point | null }>`
			SELECT ST_AsGeoJSON(geographyRD) as geographyRD
			FROM "spanJunctionBoxes"
			WHERE id = ${identifier};
		`;
		const geographyRD = result?.[0]?.geographyRD;
		return geographyRD ? JSON.parse(geographyRD) : null;
	}
}
