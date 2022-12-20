import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'migrateNen2767DecompositionCommandResponse' })
export class MigrateNen2767DecompositionModel {
	@Field((type) => [String])
	errors: string[];

	@Field((type) => [String])
	log: string[];

	@Field((type) => [String])
	successSurveyIds: string[];

	@Field((type) => [String])
	failedSurveyIds: string[];
}
