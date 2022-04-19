import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Company {
	@Field((type) => ID)
	public id: string;

	@Field()
	public role: string;

	@Field()
	public name: string;
}
