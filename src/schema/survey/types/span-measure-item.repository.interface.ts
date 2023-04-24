import { Prisma } from '@prisma/client';

const spanMeasureItems = Prisma.validator<Prisma.spanMeasureItemsArgs>()({
	select: {
		id: true,
		description: true,
		entityListId: true,
		spanMeasureId: true,
		itemType: true,
		quantityUnitOfMeasurement: true,
		quantityEstimate: true,
		quantityActual: true,
	},
});

export type SpanMeasureItem = Prisma.spanMeasureItemsGetPayload<typeof spanMeasureItems>;
