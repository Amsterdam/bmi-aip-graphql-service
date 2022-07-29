import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { Manifestation, IManifestationRepository } from './types/manifestation.repository.interface';
import { CreateManifestationInput } from './dto/create-manifestation.input';
import { UpdateManifestationInput } from './dto/update-manifestation.input';

@Injectable()
export class ManifestationRepository implements IManifestationRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createManifestation({
		name,
		objectId,
		surveyId,
		elementId,
		unitId,
		code,
		location,
		material,
		quantity,
		quantityUnitOfMeasurement,
		constructionYear,
		gisibId,
	}: CreateManifestationInput): Promise<Manifestation> {
		return this.prisma.manifestations.create({
			data: {
				id: newId(),
				objects: { connect: { id: objectId } },
				surveys: { connect: { id: surveyId } },
				elements: { connect: { id: elementId } },
				units: { connect: { id: unitId } },
				name,
				code,
				location,
				material,
				quantity,
				quantityUnitOfMeasurement,
				constructionYear,
				gisibId,
			},
		});
	}

	public async getManifestations(unitId: string): Promise<Manifestation[]> {
		return this.prisma.manifestations.findMany({
			where: {
				unitId,
			},
		});
	}

	async updateManifestation({
		id,
		name,
		code,
		location,
		material,
		quantity,
		quantityUnitOfMeasurement,
		constructionYear,
	}: UpdateManifestationInput): Promise<Manifestation> {
		const data: Prisma.manifestationsUpdateInput = {
			id,
			name,
			code,
			location,
			material,
			quantity,
			quantityUnitOfMeasurement,
			constructionYear,
		};

		return this.prisma.manifestations.update({
			where: { id },
			data,
		});
	}

	async deleteManifestation(identifier: string): Promise<Manifestation> {
		const data: Prisma.manifestationsUpdateInput = {
			deleted_at: new Date(),
		};

		return this.prisma.manifestations.update({
			where: { id: identifier },
			data,
		});
	}

	async deleteManifestationsForUnit(unitId: string): Promise<void> {
		const manifestations = await this.prisma.manifestations.findMany({
			where: {
				unitId,
			},
			select: {
				id: true,
			},
		});
		await Promise.all(manifestations.map(({ id }) => this.deleteManifestation(id)));
	}
}
