import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'nen2767ObjectWithDecomposition' })
export class Nen2767ObjectWithDecompositionModel {
	@Field((type) => ID)
	id: string;

	@Field((type) => String, { nullable: true })
	code: string;
}
