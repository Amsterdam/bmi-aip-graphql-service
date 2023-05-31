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
		isActive: true,
	},
});

export type SpanMeasureItem = Prisma.spanMeasureItemsGetPayload<typeof spanMeasureItem> & {
	quantityActual?: number | null;
	status?: string | null;
};

export interface ISpanMeasureItemRepository {
	findSpanMeasureItems(spanMeasureId: string): Promise<SpanMeasureItem[]>;
}
