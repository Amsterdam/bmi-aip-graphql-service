import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'objectTypeUnitCode' })
export class ObjectTypeUnitCode {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	code: string;

	@Field((type) => String)
	name: string;

	@Field((type) => String)
	replacementIndex: number;

	@Field((type) => Boolean)
	isStructural: boolean;

	@Field((type) => Boolean)
	isElectrical: boolean;

	@Field((type) => String, { nullable: true })
	created_at: string;

	@Field((type) => String, { nullable: true })
	updated_at: string;
}
