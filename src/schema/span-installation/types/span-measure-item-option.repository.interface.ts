import { Prisma } from '@prisma/client';

const spanMeasureItemOption = Prisma.validator<Prisma.spanMeasureItemOptionsArgs>()({
	select: {
		id: true,
		description: true,
		unitOfMeasurement: true,
		itemType: true,
		referenceNumber: true,
		created_at: true,
		updated_at: true,
	},
});
export type DbItemOptions = Prisma.spanMeasureItemOptionsGetPayload<typeof spanMeasureItemOption>;
