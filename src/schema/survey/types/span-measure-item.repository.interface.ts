import { Prisma } from '@prisma/client';

const spanMeasureItems = Prisma.validator<Prisma.spanMeasureItemsArgs>()({
	select: {
		id: true,
		spanMeasureId: true,
		itemType: true,
		quantityUnitOfMeasurement: true,
		quantityEstimate: true,
		quantityActual: true,
	},
});

export type SpanMeasureItem = Prisma.spanMeasureItemsGetPayload<typeof spanMeasureItems>;

// export interface IReachSegmentRepository {
// 	findReachSegments(arkSurveyId: string): Promise<ReachSegment[]>;
// 	createReachSegment(input: CreateReachSegmentInput): Promise<ReachSegment>;
// 	updateReachSegment(input: UpdateReachSegmentInput): Promise<ReachSegment>;
// 	deleteReachSegment(identifier: string): Promise<ReachSegment>;
// }
