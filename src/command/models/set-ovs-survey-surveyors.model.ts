import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'setOvsSurveySurveyorsCommandResponse' })
export class SetOvsSurveySurveyorsModel {
	@Field((type) => Boolean)
	done: boolean;

	@Field((type) => [String])
	errors: string[];

	@Field((type) => [String])
	log: string[];

	@Field((type) => [String])
	companyIds: string[];
}
