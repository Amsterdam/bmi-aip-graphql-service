import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'objectWithNen2767Decomposition' })
export class ObjectWithNen2767DecompositionModel {
	@Field((type) => ID)
	id: string;

	@Field((type) => String)
	code: string;
}
