import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'spanDecompositionData' })
export class SpanDecompositionData {
	@Field((type) => String, { nullable: true })
	remarks?: string;
}
