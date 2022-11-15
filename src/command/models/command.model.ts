import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'command' })
export class CommandModel {
	@Field((type) => Boolean)
	done: boolean;

	@Field((type) => [String])
	errors: string[];

	@Field((type) => [String])
	log: string[];

	@Field((type) => [String])
	companyIds: string[];
}
