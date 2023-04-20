import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
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
		name,
		decompositionId,
		decompositionType,
	}: CreateSpanMeasureInput): Promise<SpanMeasure> {
		const data: Prisma.spanMeasuresCreateInput = {
			id: newId(),
			surveys: { connect: { id: surveyId } },
			name,
			decompositionId,
			decompositionType,
		};

		return this.prisma.spanMeasures.create({ data });
	}

	async updateSpanMeasure({
		id,
		name,
		decompositionId,
		decompositionType,
	}: UpdateSpanMeasureInput): Promise<SpanMeasure> {
		const data: Prisma.spanMeasuresUpdateInput = {
			name,
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
}
