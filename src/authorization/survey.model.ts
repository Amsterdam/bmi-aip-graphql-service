import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Survey {
	@Field((type) => ID)
	public id: string;

	@Field()
	public objectId: string;
}
