import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'defaultMaintenanceMeasure' })
export class DerivedConditionScore {
	@Field((type) => ID)
	id: string;

	@Field((type) => String, { nullable: true })
	elementId: string;

	@Field((type) => String, { nullable: true })
	unitId: string;

	@Field((type) => String, { nullable: true })
	manifestationId: string;

	@Field((type) => String, { nullable: true })
	surveyId: string;

	@Field((type) => String, { nullable: true })
	score: string;

	@Field((type) => String, { nullable: true })
	derivedScore: string;

	@Field((type) => String, { nullable: true })
	careScore: string;

	@Field((type) => String, { nullable: true })
	derivedCareScore: string;

	@Field((type) => Number, { nullable: true })
	replacementIndex: number;

	@Field((type) => String, { nullable: true })
	createdAt?: string;

	@Field((type) => String, { nullable: true })
	updatedAt?: string;
}
