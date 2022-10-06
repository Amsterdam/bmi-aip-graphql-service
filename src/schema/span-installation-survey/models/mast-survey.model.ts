import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'mastSurvey' })
export class MastSurvey {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	surveyId: string;

	@Field((type) => String)
	supportSystemId: string;

	@Field((type) => Boolean)
	mastDamage: boolean;

	@Field((type) => Boolean)
	mastMissingParts: boolean;

	@Field((type) => Float, { nullable: true })
	tensionMastAngle?: number;

	@Field((type) => Boolean)
	mastAttachmentDamage: boolean;

	@Field((type) => Boolean)
	mastBracketMissingParts: boolean;

	@Field((type) => Boolean)
	mastBracketDamage: boolean;

	@Field((type) => String, { nullable: true })
	remarks?: string;

	@Field((type) => String, { nullable: true })
	createdAt?: string;

	@Field((type) => String, { nullable: true })
	updatedAt?: string;
}
