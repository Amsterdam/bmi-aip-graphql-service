import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
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
		if (!(await this.checkIfDecompositionElementExists(decompositionId, decompositionType))) {
			throw new NotFoundException('Decomposition entity not found');
		}

		return this.prisma.spanMeasures.create({
			data: {
				id: newId(),
				optionId,
				surveys: { connect: { id: surveyId } },
				description,
				decompositionId,
				decompositionType,
			},
		});
	}

	async updateSpanMeasure({
		id,
		description,
		decompositionId,
		decompositionType,
	}: UpdateSpanMeasureInput): Promise<SpanMeasure> {
		return this.prisma.spanMeasures.update({
			where: { id },
			data: {
				description,
				decompositionId,
				decompositionType,
			},
		});
	}

	async deleteSpanMeasure(id: string): Promise<SpanMeasure> {
		return this.prisma.spanMeasures.delete({
			where: { id },
		});
	}

	async findSpanMeasures(surveyId: string): Promise<SpanMeasure[]> {
		return this.prisma.spanMeasures.findMany({
			where: {
				surveyId,
			},
		});
	}

	async checkIfDecompositionElementExists(decompositionId: string, decompositionType: string): Promise<boolean> {
		switch (decompositionType) {
			case 'spanSupportSystem':
				return !!(await this.prisma.spanSupportSystems.findFirst({
					where: {
						id: decompositionId,
					},
				}));
			case 'spanLuminaire':
				return !!(await this.prisma.spanLuminaires.findFirst({
					where: {
						id: decompositionId,
					},
				}));
			case 'spanJunctionBox':
				return !!(await this.prisma.spanJunctionBoxes.findFirst({
					where: {
						id: decompositionId,
					},
				}));
		}

		return false;
	}
}
