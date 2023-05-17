import { Prisma } from '@prisma/client';

const spanMeasureItem = Prisma.validator<Prisma.spanMeasureItemsArgs>()({
	select: {
		id: true,
		description: true,
		optionId: true,
		spanMeasureId: true,
		itemType: true,
		quantityUnitOfMeasurement: true,
		quantityEstimate: true,
		status: true,
	},
});

export type SpanMeasureItem = Prisma.spanMeasureItemsGetPayload<typeof spanMeasureItem>;

export interface ISpanMeasureItemRepository {
	findSpanMeasureItems(spanMeasureId: string): Promise<SpanMeasureItem[]>;
}
