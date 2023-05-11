import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils/newId';

import { SpanMeasureOption } from './models/span-measure-option.model';
@Injectable()
export class SpanMeasureOptionRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async clearMatrix(): Promise<void> {
		await this.prisma.spanMeasureOptionsMatrix.deleteMany({});
	}

	async createSpanMeasureOption({ description, decompositionType, referenceNumber }): Promise<SpanMeasureOption> {
		const data: Prisma.spanMeasureOptionsCreateInput = {
			id: newId(),
			description,
			decompositionType,
			referenceNumber,
		};

		const spanMeasureOption = await this.prisma.spanMeasureOptions.upsert({
			where: { referenceNumber },
			update: {},
			create: data,
		});

		return {
			...spanMeasureOption,
			measureItems: [],
		};
	}

	async createSpanMeasureItemOption({
		description,
		unitOfMeasurement,
		referenceNumber,
		itemType,
		spanMeasureOptionId,
	}): Promise<any> {
		const id = newId();

		const data: Prisma.spanMeasureItemOptionsCreateInput = {
			id: id,
			description,
			unitOfMeasurement,
			referenceNumber,
			itemType,
		};

		const result = await this.prisma.spanMeasureItemOptions.upsert({
			where: { referenceNumber },
			update: {},
			create: data,
		});

		const matrixData: Prisma.spanMeasureOptionsMatrixCreateInput = {
			spanMeasureOption: {
				connect: {
					id: spanMeasureOptionId,
				},
			},
			spanMeasureItemOption: {
				connect: {
					id: result.id,
				},
			},
		};

		const matrixResult = await this.prisma.spanMeasureOptionsMatrix.create({
			data: matrixData,
		});

		return matrixResult;
	}

	async findSpanMeasureOptions(): Promise<any[]> {
		const spanMeasureOptions = await this.prisma.spanMeasureOptions.findMany({
			include: {
				spanMeasureOptions: {
					include: {
						spanMeasureItemOption: true,
					},
				},
			},
		});

		return spanMeasureOptions.map(async (spanMeasureOption) => {
			return {
				...spanMeasureOption,
				measureItems: spanMeasureOption.spanMeasureOptions.map((item) => {
					return item.spanMeasureItemOption;
				}),
			};
		});
	}
}

// Lokaal: Excel plaatsen
// Lokaal: command draaien, schiet data in lokale db
// Lokaal: vanuit lokale DB een json opmaken
// Lokaal: json in migratie stoppen
// Omgeving: migration uitvoeren
// Bij updates: nieuwe json diffen met oude json, enkel nieuwe data in migratie stoppen

// Todo: plan uitschrijven
// console command draaien
// via TablePlus JSON export maken
// JSON in migraton stoppen
