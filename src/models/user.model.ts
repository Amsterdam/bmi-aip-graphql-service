import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
	@Field((type) => ID)
	public id: string;

	@Field()
	public firstName: string;

	@Field()
	public lastName: string;
}
