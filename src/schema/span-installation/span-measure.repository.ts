import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';

import { ISpanMeasureRepository, SpanMeasure } from './types/span-measure.repository.interface';

@Injectable()
export class SpanMeasureRepository implements ISpanMeasureRepository {
	public constructor(private readonly prisma: PrismaService) {}

	// async createSpanMeasure({
	// 	surveyId,
	// 	name,
	// 	decompositionId,
	// 	decompositionType,
	// }: CreateSpanMeasureInput): Promise<SpanMeasure> {
	// 	const data: Prisma.spanMeasuresCreateInput = {
	// 		id: newId(),
	// 		surveys: { connect: { id: surveyId } },
	// 		name,
	// 		decompositionId,
	// 		decompositionType
	// 	};

	// 	const spanMeasure = await this.prisma.spanMeasures.create({ data });

	// 	return SpanMeasureFactory.CreateSpanMeasure(spanMeasure);
	// }

	async getSpanMeasures(surveyId: string): Promise<SpanMeasure[]> {
		const spanMeasures = (await this.prisma.spanMeasures.findMany({
			where: {
				surveyId,
			},
		})) as SpanMeasure[];

		return spanMeasures;
	}
}
