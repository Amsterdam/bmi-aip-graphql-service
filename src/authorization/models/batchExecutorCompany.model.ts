import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BatchExecutorCompany {
	@Field((type) => ID)
	public id: string;

	@Field()
	public companyId: string;

	@Field()
	public batchId: string;
}
