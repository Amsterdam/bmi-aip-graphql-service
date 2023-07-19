import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { ISpanMeasureRepository, SpanMeasure } from './types/span-measure.repository.interface';
import { CreateSpanMeasureInput } from './dto/create-span-measure.input';
import { UpdateSpanMeasureInput } from './dto/update-span-measure-input';
import { SpanDecompositionItemType } from './types/span-decomposition-item-type';
import { SpanMeasureStatus } from './types/span-measure-status';

@Injectable()
export class SpanMeasureRepository implements ISpanMeasureRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createSpanMeasure({
		surveyId,
		optionId,
		description,
		decompositionItemId,
		decompositionItemType,
	}: CreateSpanMeasureInput): Promise<SpanMeasure> {
		if (!(await this.checkIfDecompositionElementExists(decompositionItemId, decompositionItemType))) {
			throw new NotFoundException('Decomposition entity not found');
		}

		return this.prisma.spanMeasures.create({
			data: {
				id: newId(),
				optionId,
				surveys: { connect: { id: surveyId } },
				description,
				decompositionItemId,
				decompositionItemType,
			},
		});
	}

	async updateSpanMeasure({
		id,
		description,
		decompositionItemId,
		decompositionItemType,
	}: UpdateSpanMeasureInput): Promise<SpanMeasure> {
		return this.prisma.spanMeasures.update({
			where: { id },
			data: {
				description,
				decompositionItemId,
				decompositionItemType,
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

	async findSpanMeasuresByDecompositionItemId(decompositionItemId: string): Promise<SpanMeasure[]> {
		return this.prisma.spanMeasures.findMany({
			where: {
				decompositionItemId,
			},
		});
	}

	async checkIfDecompositionElementExists(
		decompositionItemId: string,
		decompositionItemType: SpanDecompositionItemType,
	): Promise<boolean> {
		switch (decompositionItemType) {
			case SpanDecompositionItemType.spanSupportSystemMast:
				return !!(await this.prisma.spanSupportSystems.findFirst({
					where: {
						id: decompositionItemId,
						type: 'Mast',
					},
				}));
				break;
			case SpanDecompositionItemType.spanSupportSystemFacade:
				return !!(await this.prisma.spanSupportSystems.findFirst({
					where: {
						id: decompositionItemId,
						type: 'Facade',
					},
				}));
				break;
			case SpanDecompositionItemType.spanSupportSystemNode:
				return !!(await this.prisma.spanSupportSystems.findFirst({
					where: {
						id: decompositionItemId,
						type: 'Node',
					},
				}));
				break;
			case SpanDecompositionItemType.spanSupportSystemTensionWire:
				return !!(await this.prisma.spanSupportSystems.findFirst({
					where: {
						id: decompositionItemId,
						type: 'TensionWire',
					},
				}));
				break;
			case SpanDecompositionItemType.spanLuminaire:
				return !!(await this.prisma.spanLuminaires.findFirst({
					where: {
						id: decompositionItemId,
					},
				}));
				break;
			case SpanDecompositionItemType.spanJunctionBox:
				return !!(await this.prisma.spanJunctionBoxes.findFirst({
					where: {
						id: decompositionItemId,
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
