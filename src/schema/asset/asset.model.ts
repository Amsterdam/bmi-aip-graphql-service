import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Asset {
	@Field((type) => ID)
	public id: string;

	@Field()
	public code: string;

	@Field()
	public status: string;

	@Field()
	public isDemo: boolean;

	@Field()
	public ownerCompanyId: string;

	@Field()
	public clientCompanyId: string;
}
