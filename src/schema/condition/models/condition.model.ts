import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'condition' })
export class Condition {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	surveyId: string;

	@Field((type) => String, { nullable: true })
	elementId?: string;

	@Field((type) => String)
	unitId: string;

	@Field((type) => String, { nullable: true })
	manifestationId?: string;

	@Field((type) => String)
	advice: string;

	@Field((type) => Float)
	cost: number;

	@Field((type) => Float)
	costYear?: number;

	@Field((type) => String)
	score?: string;

	@Field((type) => String)
	careScore: string;

	@Field((type) => String)
	investigationPriority?: string;

	@Field((type) => String)
	craInspectionRemarks?: string;

	@Field((type) => Float)
	craInitialScore?: number;

	@Field((type) => Float)
	craHistoryScore?: number;

	@Field((type) => Float)
	craInspectionScore?: number;

	@Field((type) => String)
	craInitialRemarks?: string;

	@Field((type) => String)
	craHistoryRemarks?: string;

	@Field((type) => Float)
	craInitialUnityCheck?: number;

	@Field((type) => Float)
	craHistoryUnityCheck?: number;

	@Field((type) => String)
	ramsMaxTotalPriority?: string;

	@Field((type) => String)
	ramsMaxWeightedPriority?: string;

	@Field((type) => Boolean)
	isFurtherInvestigation?: boolean;

	@Field((type) => String, { nullable: true })
	createdAt: string;

	@Field((type) => String, { nullable: true })
	updatedAt: string;
}
