import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'nen2767MigrateDecompositionCommandResponse' })
export class Nen2767MigrateDecompositionModel {
	@Field((type) => [String])
	errors: string[];

	@Field((type) => [String])
	log: string[];

	@Field((type) => [String])
	successSurveyIds: string[];

	@Field((type) => [String])
	failedSurveyIds: string[];
}
