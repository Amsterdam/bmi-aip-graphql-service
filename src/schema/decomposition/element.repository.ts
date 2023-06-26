import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { Element, ElementWithUnits, IElementRepository } from './types/element.repository.interface';
import { CreateElementInput } from './dto/create-element.input';
import { UpdateElementInput } from './dto/update-element.input';

@Injectable()
export class ElementRepository implements IElementRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createElement({
		objectId,
		surveyId,
		name,
		code,
		location,
		constructionYear,
		constructionType,
		elementGroupName,
		categoryId,
		isArchived,
		isStructural,
		isStructuralObjectSpecific,
		isElectrical,
		isElectricalObjectSpecific,
		isRelevant,
		gisibId,
	}: CreateElementInput): Promise<Element> {
		const data: Prisma.elementsCreateInput = {
			id: newId(),
			objects: { connect: { id: objectId } },
			surveys: { connect: { id: surveyId } },
			name,
			code,
			location,
			constructionYear,
			constructionType,
			elementGroupName,
			isArchived,
			isStructural,
			isStructuralObjectSpecific,
			isElectrical,
			isElectricalObjectSpecific,
			isRelevant,
			gisibId,
		};

		if (categoryId) {
			data.elementCategories = { connect: { id: categoryId } };
		}

		return this.prisma.elements.create({ data });
	}

	async getElements(surveyId: string): Promise<Element[]> {
		return this.prisma.elements.findMany({
			where: {
				surveyId,
				deleted_at: null,
			},
		});
	}

	public async getElementById(id: string): Promise<Element> {
		return this.prisma.elements.findUnique({
			where: {
				id,
			},
		});
	}

	async updateElement({
		id,
		name,
		code,
		location,
		constructionYear,
		constructionType,
		elementGroupName,
		categoryId,
		isArchived,
		isStructural,
		isStructuralObjectSpecific,
		isElectrical,
		isElectricalObjectSpecific,
		isRelevant,
		gisibId,
	}: UpdateElementInput): Promise<Element> {
		const data: Prisma.elementsUpdateInput = {
			name,
			code,
			location,
			constructionYear,
			constructionType,
			elementGroupName,
			isArchived,
			isStructural,
			isStructuralObjectSpecific,
			isElectrical,
			isElectricalObjectSpecific,
			isRelevant,
			gisibId,
		};

		if (categoryId) {
			data.elementCategories = { connect: { id: categoryId } };
		}

		return this.prisma.elements.update({
			where: { id },
			data,
		});
	}

	async deleteElement(identifier: string): Promise<Element> {
		const data: Prisma.elementsUpdateInput = {
			deleted_at: new Date(),
		};

		return this.prisma.elements.update({
			where: { id: identifier },
			data,
		});
	}

	async getElementWithUnits(surveyId: string): Promise<ElementWithUnits[]> {
		return this.prisma.elements.findMany({
			where: {
				surveyId: surveyId,
				deleted_at: null,
			},
			include: {
				units: true,
			},
		});
	}

	async hasUnits(identifier: string): Promise<boolean> {
		const unitCount = await this.prisma.units.count({
			where: {
				elementId: identifier,
				deleted_at: null,
			},
		});
		return !!unitCount;
	}
}
