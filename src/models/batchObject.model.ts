import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BatchObject {
	@Field((type) => ID)
	public id: string;

	@Field()
	public objectId: string;

	@Field()
	public batchId: string;
}
