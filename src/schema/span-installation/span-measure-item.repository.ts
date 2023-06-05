import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { SpanMeasureItem } from './models/span-measure-item.model';
import { CreateSpanMeasureItemInput } from './dto/create-span-measure-item.input';
import { ISpanMeasureItemRepository } from './types/span-measure-item.repository.interface';
import { SaveSpanMeasureItemsInput } from './dto/save-span-measure-items-input';
import { UpdateSpanMeasureItemsActualsInput } from './dto/update-span-measure-items-actuals-input';
import { SpanMeasureItemFactory } from './span-measure-item.factory';

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
		isActive,
	}: CreateSpanMeasureItemInput): Promise<SpanMeasureItem> {
		return this.prisma.spanMeasureItems.create({
			data: {
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
				isActive: isActive,
			},
		});
	}

	async findSpanMeasureItems(spanMeasureId: string): Promise<SpanMeasureItem[]> {
		return this.prisma.spanMeasureItems.findMany({
			where: {
				spanMeasureId,
			},
		});
	}

	async findActiveSpanMeasureItems(spanMeasureId: string): Promise<SpanMeasureItem[]> {
		return this.prisma.spanMeasureItems.findMany({
			where: {
				spanMeasureId,
				isActive: true,
			},
		});
	}

	async updateSpanMeasureItemsActuals(input: UpdateSpanMeasureItemsActualsInput): Promise<SpanMeasureItem[]> {
		if (input.spanMeasureItemActuals) {
			await Promise.all(
				input.spanMeasureItemActuals.map(async (spanMeasureItemActual) => {
					// Item not found for given id/spanMeasureId combination
					const result = await this.prisma.spanMeasureItems.findFirst({
						where: {
							id: spanMeasureItemActual.id,
							spanMeasureId: input.spanMeasureId,
						},
					});

					if (!result) {
						throw new NotFoundException(`No item found for given spanMeasureItemId (${spanMeasureItemActual.id}) / spanMeasureId (${input.spanMeasureId}) combination`);
					}

					await this.prisma.spanMeasureItems.update({
						where: {
							id: spanMeasureItemActual.id,
						},
						data: {
							quantityActual: spanMeasureItemActual.quantityActual,
							isActive: spanMeasureItemActual.active,
						},
					});
				}),
			);

			return this.findSpanMeasureItems(input.spanMeasureId);
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
				await this.prisma.spanMeasureItems.createMany({
					data: SpanMeasureItemFactory.FormatSpanMeasureItems(spanMeasureItemsInput),
				});

				return this.findSpanMeasureItems(spanMeasureItemsInput.spanMeasureId);
			}
		} else {
			if (spanMeasureItemsInput.spanMeasureItems) {
				await this.prisma.spanMeasureItems.createMany({
					data: SpanMeasureItemFactory.FormatSpanMeasureItems(spanMeasureItemsInput),
				});

				return this.findSpanMeasureItems(spanMeasureItemsInput.spanMeasureId);
			}
		}
	}
}
