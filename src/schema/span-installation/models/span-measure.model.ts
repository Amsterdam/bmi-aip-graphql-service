import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'spanMeasure' })
export class SpanMeasure {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	surveyId: string;

	@Field((type) => String)
	name: string;

	@Field((type) => String)
	decompositionId: string;

	@Field((type) => String)
	decompositionType: string;

	@Field((type) => String, { nullable: true })
	createdAt: string;

	@Field((type) => String, { nullable: true })
	updatedAt: string;
}
