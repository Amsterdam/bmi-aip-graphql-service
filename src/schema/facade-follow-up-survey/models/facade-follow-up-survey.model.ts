import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'facadeFollowUpSurvey' })
export class FacadeFollowUpSurvey {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	surveyId: string;

	@Field((type) => String, { nullable: true })
	preparedAuthor?: string;

	@Field((type) => Date, { nullable: true })
	preparedDate?: Date;

	@Field((type) => String, { nullable: true })
	verifiedAuthor?: string;

	@Field((type) => Date, { nullable: true })
	verifiedDate?: Date;

	@Field((type) => String, { nullable: true })
	remarks?: string;

	@Field((type) => String, { nullable: true })
	created_at: string;

	@Field((type) => String, { nullable: true })
	updated_at: string;

	@Field((type) => String, { nullable: true })
	deleted_at: string;
}
