import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'object' })
export class UpdateObjectModel {
	@Field((type) => String)
	success: string;
}
