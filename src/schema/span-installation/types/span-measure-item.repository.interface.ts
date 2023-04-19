import { Prisma } from '@prisma/client';

const spanMeasureItem = Prisma.validator<Prisma.spanMeasureItemsArgs>()({
	select: {
		id: true,
		spanMeasureId: true,
		itemType: true,
		quantityUnitOfMeasurement: true,
		quantityEstimate: true,
		quantityActual: true,
	},
});

export type SpanMeasure = Prisma.spanMeasureItemsGetPayload<typeof spanMeasureItem>;

export interface ISpanMeasureItemRepository {
	findSpanMeasureItems(spanMeasureId: string): Promise<SpanMeasure[]>;
}
