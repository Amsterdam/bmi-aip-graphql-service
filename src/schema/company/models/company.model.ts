import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'company' })
export class Company {
	@Field((type) => ID)
	public id: string;

	@Field(() => String)
	public role: string;

	@Field(() => String)
	public name: string;

	@Field(() => String, { nullable: true })
	public street?: string;

	@Field(() => String, { nullable: true })
	public state?: string;

	@Field(() => String, { nullable: true })
	public city?: string;

	@Field(() => String, { nullable: true })
	public zip?: string;

	@Field(() => String, { nullable: true })
	public country?: string;

	@Field(() => Number, { defaultValue: 0 })
	public storageLimit: number;

	@Field(() => Number, { defaultValue: 0 })
	public storageUsed: number;

	@Field(() => String, { nullable: true })
	public status?: string;

	@Field((type) => String, { nullable: true })
	createdAt?: string;

	@Field((type) => String, { nullable: true })
	updatedAt?: string;

	// The following are not in use AFAIK

	// @Field(() => Boolean, { defaultValue: false })
	// public isClient: boolean;
	//
	// @Field(() => String, { nullable: true })
	// public customerVersion?: string;

	// @Field(() => String, { nullable: true })
	// public supportEmail?: string;
}
