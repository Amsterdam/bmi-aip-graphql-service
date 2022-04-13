import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BatchExecutorCompany {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	@Field(/* istanbul ignore next */ (type) => ID)
	public id: string;

	@Field()
	public companyId: string;

	@Field()
	public batchId: string;
}
