import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Asset {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	@Field(/* istanbul ignore next */ (type) => ID)
	public id: string;

	@Field()
	public status: string;

	@Field()
	public isDemo: boolean;

	@Field()
	public ownerCompanyId: string;

	@Field()
	public clientCompanyId: string;
}
