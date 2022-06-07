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

	async updateManifestation({
		name,
		elementId,
		unitId,
		code,
		location,
		material,
		quantity,
		quantityUnitOfMeasurement,
		constructionYear,
		gisibId,
	}: UpdateManifestationInput): Promise<Manifestation> {
		const data: Prisma.manifestationsUpdateInput = {
			name,
			elementId,
			unitId,
			code,
			location,
			material,
			quantity,
			quantityUnitOfMeasurement,
			constructionYear,
			gisibId,
		};

		return this.prisma.manifestations.update({
			where: { id },
			data,
		});
	}
}
