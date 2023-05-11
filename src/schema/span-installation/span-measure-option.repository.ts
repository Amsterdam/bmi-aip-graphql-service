import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils/newId';

import { SpanMeasureOption } from './models/span-measure-option.model';
@Injectable()
export class SpanMeasureOptionRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createSpanMeasureOption({ description, decompositionType, referenceNumber }): Promise<SpanMeasureOption> {
		const data: Prisma.spanMeasureOptionsCreateInput = {
			id: newId(),
			description,
			decompositionType,
			referenceNumber,
		};

		const spanMeasureOption = await this.prisma.spanMeasureOptions.create({ data });

		return {
			...spanMeasureOption,
			measureItems: [],
		};
	}

	async createSpanMeasureItemOption({
		spanMeasureOptionId,
		description,
		unitOfMeasurement,
		referenceNumber,
		itemType,
	}): Promise<any> {
		const data: Prisma.spanMeasureItemOptionsCreateInput = {
			id: newId(),
			description,
			unitOfMeasurement,
			referenceNumber,
			itemType,
			spanMeasureOptions: {
				connect: {
					id: spanMeasureOptionId,
				},
			},
		};

		return this.prisma.spanMeasureItemOptions.create({ data });
	}

	async findSpanMeasureOptions(): Promise<any[]> {
		const spanMeasureOptions = await this.prisma.spanMeasureOptions.findMany({
			include: {
				spanMeasureItemOptions: true,
			},
		});

		return spanMeasureOptions.map((spanMeasureOption) => {
			return {
				...spanMeasureOption,
				measureItems: spanMeasureOption.spanMeasureItemOptions,
			};
		});
	}
}
