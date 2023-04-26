import { PrismaService } from 'src/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { newId } from '../../utils';

import { ISpanMeasureRepository, SpanMeasure } from './types/span-measure.repository.interface';
import { CreateSpanMeasureInput } from './dto/create-span-measure.input';
import { UpdateSpanMeasureInput } from './dto/update-span-measure-input';

@Injectable()
export class SpanMeasureRepository implements ISpanMeasureRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createSpanMeasure({
		surveyId,
		optionId,
		description,
		decompositionId,
		decompositionType,
	}: CreateSpanMeasureInput): Promise<SpanMeasure> {
		const data: Prisma.spanMeasuresCreateInput = {
			id: newId(),
			optionId,
			surveys: { connect: { id: surveyId } },
			description,
			decompositionId,
			decompositionType,
		};

		if (!(await this.checkIfDecompositionElementExists(decompositionId, decompositionType))) {
			throw new NotFoundException('Decomposition entity not found');
		}

		return this.prisma.spanMeasures.create({ data });
	}

	async updateSpanMeasure({
		id,
		description,
		decompositionId,
		decompositionType,
	}: UpdateSpanMeasureInput): Promise<SpanMeasure> {
		const data: Prisma.spanMeasuresUpdateInput = {
			description,
			decompositionId,
			decompositionType,
		};

		return this.prisma.spanMeasures.update({
			where: { id },
			data,
		});
	}

	async deleteSpanMeasure(id: string): Promise<SpanMeasure> {
		return this.prisma.spanMeasures.delete({
			where: { id },
		});
	}

	async findSpanMeasures(surveyId: string): Promise<SpanMeasure[]> {
		const spanMeasures = (await this.prisma.spanMeasures.findMany({
			where: {
				surveyId,
			},
		})) as SpanMeasure[];

		return spanMeasures;
	}

	async checkIfDecompositionElementExists(decompositionId: string, decompositionType: string): Promise<boolean> {
		let entityExists = false;

		switch (decompositionType) {
			case 'spanSupportSystem':
				entityExists = (await this.prisma.spanSupportSystems.findFirst({
					where: {
						id: decompositionId,
					},
				}))
					? true
					: false;
				break;
			case 'spanLuminaire':
				entityExists = (await this.prisma.spanLuminaires.findFirst({
					where: {
						id: decompositionId,
					},
				}))
					? true
					: false;
				break;
			case 'spanJunctionBox':
				entityExists = (await this.prisma.spanJunctionBoxes.findFirst({
					where: {
						id: decompositionId,
					},
				}))
					? true
					: false;
				break;
		}

		return entityExists;
	}
}
