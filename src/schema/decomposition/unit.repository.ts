import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { Unit, IUnitRepository } from './types/unit.repository.interface';
import { CreateUnitInput } from './dto/create-unit.input';
import { UpdateUnitInput } from './dto/update-unit.input';
import { ManifestationRepository } from './manifestation.repository';

@Injectable()
export class UnitRepository implements IUnitRepository {
	public constructor(
		private readonly prisma: PrismaService,
		private readonly manifestationRepo: ManifestationRepository,
	) {}

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
		gisibId,
	}: CreateUnitInput): Promise<Unit> {
		const data: Prisma.unitsCreateInput = {
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
		};

		return this.prisma.units.create({ data });
	}

	public async getUnits(elementId: string): Promise<Unit[]> {
		return this.prisma.units.findMany({
			where: {
				elementId,
				deleted_at: null,
			},
		});
	}

	async updateUnit({
		id,
		name,
		code,
		location,
		gisibId,
		material,
		quantity,
		quantityUnitOfMeasurement,
		constructionYear,
		isStructural,
		isElectrical,
		isStructuralObjectSpecific,
		isElectricalObjectSpecific,
		isRelevant,
	}: UpdateUnitInput): Promise<Unit> {
		const data: Prisma.unitsUpdateInput = {
			id,
			name,
			code,
			location,
			gisibId,
			material,
			quantity,
			quantityUnitOfMeasurement,
			constructionYear,
			isStructural,
			isElectrical,
			isStructuralObjectSpecific,
			isElectricalObjectSpecific,
			isRelevant,
		};

		return this.prisma.units.update({
			where: { id },
			data,
		});
	}

	async deleteUnit(identifier: string): Promise<Unit> {
		const data: Prisma.unitsUpdateInput = {
			deleted_at: new Date(),
		};

		return this.prisma.units.update({
			where: { id: identifier },
			data,
		});
	}

	async deleteUnitsForElement(elementId: string): Promise<void> {
		const units = await this.prisma.units.findMany({
			where: {
				elementId,
			},
			select: {
				id: true,
			},
		});
		await Promise.all(
			units.map(async ({ id }) => {
				await this.manifestationRepo.deleteManifestationsForUnit(id);
				await this.deleteUnit(id);
			}),
		);
	}
}
