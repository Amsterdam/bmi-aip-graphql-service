import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { ISpanMeasureRepository, SpanMeasure } from './types/span-measure.repository.interface';
import { CreateSpanMeasureInput } from './dto/create-span-measure.input';
import { UpdateSpanMeasureInput } from './dto/update-span-measure-input';
import { SpanDecompositionType } from './types/span-decomposition-type';
import { SpanMeasureStatus } from './types/span-measure-status';

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

	async findSpanMeasuresByDecompositionId(decompositionId: string): Promise<SpanMeasure[]> {
		return this.prisma.spanMeasures.findMany({
			where: {
				decompositionId,
			},
		});
	}

	async checkIfDecompositionElementExists(
		decompositionId: string,
		decompositionType: SpanDecompositionType,
	): Promise<boolean> {
		switch (decompositionType) {
			case SpanDecompositionType.spanSupportSystemMast:
				return !!(await this.prisma.spanSupportSystems.findFirst({
					where: {
						id: decompositionId,
						type: 'Mast',
					},
				}));
				break;
			case SpanDecompositionType.spanSupportSystemFacade:
				return !!(await this.prisma.spanSupportSystems.findFirst({
					where: {
						id: decompositionId,
						type: 'Facade',
					},
				}));
				break;
			case SpanDecompositionType.spanSupportSystemNode:
				return !!(await this.prisma.spanSupportSystems.findFirst({
					where: {
						id: decompositionId,
						type: 'Node',
					},
				}));
				break;
			case SpanDecompositionType.spanLuminaire:
				return !!(await this.prisma.spanLuminaires.findFirst({
					where: {
						id: decompositionId,
					},
				}));
				break;
			case SpanDecompositionType.spanJunctionBox:
				return !!(await this.prisma.spanJunctionBoxes.findFirst({
					where: {
						id: decompositionId,
					},
				}));
				break;
		}

		return false;
	}

	async determineSpanMeasureStatus(spanMeasureId: string): Promise<SpanMeasureStatus> {
		return SpanMeasureStatus.open;
	}
}
