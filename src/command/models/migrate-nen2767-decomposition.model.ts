import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'migrateNen2767DecompositionCommandResponse' })
export class MigrateNen2767DecompositionModel {
	// @Field((type) => Boolean)
	// done: boolean;

	@Field((type) => [String])
	errors: string[];

	@Field((type) => [String])
	log: string[];

	// @Field((type) => [String])
	// successObjectIds: string[];

	@Field((type) => [String])
	successSurveyIds: string[];

	// @Field((type) => [String])
	// failedObjectIds: string[];

	@Field((type) => [String])
	failedSurveyIds: string[];
}
