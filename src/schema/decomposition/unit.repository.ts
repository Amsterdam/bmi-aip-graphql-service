import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { Unit, IUnitRepository } from './types/unit.repository.interface';
import { CreateUnitInput } from './dto/create-unit.input';
import { UpdateUnitInput } from './dto/update-unit.input';

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

	public async getUnitById(id: string): Promise<Unit> {
		return this.prisma.units.findFirst({
			where: {
				id,
				deleted_at: null,
			},
		});
	}

	public async getUnitsBySurveyId(surveyId: string): Promise<Unit[]> {
		return this.prisma.units.findMany({
			where: {
				surveyId,
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

	async hasManifestations(identifier: string): Promise<boolean> {
		const manifestationCount = await this.prisma.manifestations.count({
			where: {
				unitId: identifier,
				deleted_at: null,
			},
		});
		return !!manifestationCount;
	}

	async getLastCreatedForSurvey(permanentId: string, surveyId: string): Promise<Unit> {
		return this.prisma.units.findFirst({
			where: {
				permanentId,
				surveyId,
			},
			orderBy: {
				created_at: 'desc',
			},
		});
	}
}
