import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Company {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	@Field(/* istanbul ignore next */ (type) => ID)
	public id: string;

	@Field()
	public role: string;

	@Field()
	public name: string;
}
