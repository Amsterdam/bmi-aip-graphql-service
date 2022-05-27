import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { Unit, IUnitRepository } from './types/unit.repository.interface';
import { CreateUnitInput } from './dto/create-unit.input';

@Injectable()
export class UnitRepository implements IUnitRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createUnit({
		objectId,
		surveyId,
		elementId,
		name,
		code,
		location,
		material,
		quantity,
		quantityUnitOfMeasurement,
		constructionYear,
		isArchived,
		isStructural,
		isStructuralObjectSpecific,
		isElectrical,
		isElectricalObjectSpecific,
		isRelevant,
	}: CreateUnitInput): Promise<Unit> {
		return this.prisma.units.create({
			data: {
				id: newId(),
				objects: { connect: { id: objectId } },
				surveys: { connect: { id: surveyId } },
				elements: { connect: { id: elementId } },
				name,
				code,
				location,
				material,
				quantity,
				quantityUnitOfMeasurement,
				constructionYear,
				isArchived,
				isStructural,
				isStructuralObjectSpecific,
				isElectrical,
				isElectricalObjectSpecific,
				isRelevant,
			},
		});
	}
}
