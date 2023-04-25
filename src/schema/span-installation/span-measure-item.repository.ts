import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { SpanMeasureItem } from './models/span-measure-item.model';
import { CreateSpanMeasureItemInput } from './dto/create-span-measure-item.input';
import { ISpanMeasureItemRepository } from './types/span-measure-item.repository.interface';
import { SaveSpanMeasureItemsInput } from './dto/save-span-measure-items-input';
import { UpdateSpanMeasureItemsActualsInput } from './dto/update-span-measure-items-actuals-input';

@Injectable()
export class SpanMeasureItemRepository implements ISpanMeasureItemRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createSpanMeasureItem({
		spanMeasureId,
		optionId,
		description,
		itemType,
		quantityUnitOfMeasurement,
		quantityEstimate,
		quantityActual,
	}: CreateSpanMeasureItemInput): Promise<SpanMeasureItem> {
		const data: Prisma.spanMeasureItemsCreateInput = {
			id: newId(),
			description: description,
			optionId,
			spanMeasures: {
				connect: {
					id: spanMeasureId,
				},
			},
			itemType: itemType,
			quantityUnitOfMeasurement: quantityUnitOfMeasurement,
			quantityEstimate: quantityEstimate,
			quantityActual: quantityActual,
		};

		return this.prisma.spanMeasureItems.create({ data });
	}

	async findSpanMeasureItems(spanMeasureId: string): Promise<SpanMeasureItem[]> {
		return this.prisma.spanMeasureItems.findMany({
			where: {
				spanMeasureId,
			},
		});
	}

	async updateSpanMeasureItemsActuals(input: UpdateSpanMeasureItemsActualsInput): Promise<SpanMeasureItem[]> {
		console.log(input);

		if (input.spanMeasureItemActuals) {
			input.spanMeasureItemActuals.map(async (spanMeasureItemActual) => {
				// Item not found for given id/spanMeasureId combination
				const result = await this.prisma.spanMeasureItems.findFirst({
					where: {
						id: spanMeasureItemActual.id,
						spanMeasureId: input.spanMeasureId,
					},
				});

				if (!result) {
					throw new NotFoundException('No item found for given id/spanMeasureId combination');
				}

				await this.prisma.spanMeasureItems.update({
					where: {
						id: spanMeasureItemActual.id,
					},
					data: {
						quantityActual: spanMeasureItemActual.quantityActual,
					},
				});
			});
		}

		return this.findSpanMeasureItems(input.spanMeasureId);
	}

	async saveSpanMeasureItems(spanMeasureItemsInput: SaveSpanMeasureItemsInput): Promise<SpanMeasureItem[]> {
		const existingRecords = await this.prisma.spanMeasureItems.findFirst({
			where: {
				spanMeasureId: spanMeasureItemsInput.spanMeasureId,
			},
		});

		if (existingRecords) {
			await this.prisma.spanMeasureItems.deleteMany({
				where: {
					spanMeasureId: spanMeasureItemsInput.spanMeasureId,
				},
			});

			if (spanMeasureItemsInput.spanMeasureItems) {
				const spanMeasureItemsFormatted =
					spanMeasureItemsInput.spanMeasureItems as Prisma.spanMeasureItemsCreateManyInput[];
				spanMeasureItemsFormatted.map((spanMeasureItem) => {
					spanMeasureItem.spanMeasureId = spanMeasureItemsInput.spanMeasureId;
					spanMeasureItem.id = newId();
				});

				await this.prisma.spanMeasureItems.createMany({
					data: spanMeasureItemsFormatted,
				});

				return this.findSpanMeasureItems(spanMeasureItemsInput.spanMeasureId);
			}
		} else {
			if (spanMeasureItemsInput.spanMeasureItems) {
				const spanMeasureItemsFormatted =
					spanMeasureItemsInput.spanMeasureItems as Prisma.spanMeasureItemsCreateManyInput[];
				spanMeasureItemsFormatted.map((spanMeasureItem) => {
					spanMeasureItem.spanMeasureId = spanMeasureItemsInput.spanMeasureId;
					spanMeasureItem.id = newId();
				});

				await this.prisma.spanMeasureItems.createMany({
					data: spanMeasureItemsFormatted,
				});

				return this.findSpanMeasureItems(spanMeasureItemsInput.spanMeasureId);
			}
		}
	}
}
