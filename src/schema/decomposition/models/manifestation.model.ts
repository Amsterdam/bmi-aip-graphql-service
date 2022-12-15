import { Field, ObjectType } from '@nestjs/graphql';

// @InputType({ isAbstract: true })
@ObjectType({ description: 'manifestation' })
export class Manifestation {
	@Field((type) => String)
	id: string;

	@Field((type) => String, { nullable: true })
	permanentId: string;

	@Field((type) => String)
	name: string;

	@Field((type) => String, { nullable: true })
	code?: string;

	@Field((type) => String, { nullable: true })
	location?: string;

	@Field((type) => String)
	objectId: string;

	@Field((type) => String)
	surveyId: string;

	@Field((type) => String)
	elementId: string;

	@Field((type) => String)
	unitId: string;

	@Field((type) => String, { nullable: true })
	conditionId?: string;

	@Field((type) => String, { nullable: true })
	observationPointId?: string;

	@Field((type) => String, { nullable: true })
	material?: string;

	@Field((type) => Number, { nullable: true })
	quantity?: number;

	@Field((type) => String, { nullable: true })
	quantityUnitOfMeasurement?: string;

	@Field((type) => Number, { nullable: true })
	constructionYear?: number;

	@Field((type) => String, { nullable: true })
	deletedAt: string;
}
