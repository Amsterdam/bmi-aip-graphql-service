import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'object' })
export class OVSDecompositionModel {
	@Field((type) => String)
	success: string;
}
