import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { Manifestation, IManifestationRepository } from './types/manifestation.repository.interface';
import { CreateManifestationInput } from './dto/create-manifestation.input';

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
}
