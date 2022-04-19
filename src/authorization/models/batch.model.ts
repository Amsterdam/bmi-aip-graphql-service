import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Batch {
	@Field((type) => ID)
	public id: string;

	@Field()
	public status: string;
}
