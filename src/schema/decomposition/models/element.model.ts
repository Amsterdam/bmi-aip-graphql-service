import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'element' })
export class Element {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	surveyId: string;

	@Field((type) => String)
	name: string;

	@Field((type) => Int, { nullable: true })
	code?: number;

	@Field((type) => String, { nullable: true })
	location?: string;

	// ... TODO
}
