import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'mastSurvey' })
export class MastSurvey {
	@Field((type) => ID)
	id: string;

	@Field((type) => String)
	supportSystemId: string;

	// Maps to "Schade aan de mast?"
	@Field((type) => Boolean, { nullable: true })
	mastDamage?: boolean;

	// Maps to "Ontbrekende onderdelen aan de mast?"
	@Field((type) => Boolean, { nullable: true })
	mastMissingParts?: boolean;

	// Maps to "Hoek van de spanmast"
	@Field((type) => Float, { nullable: true })
	tensionMastAngle?: number;

	// Maps to "Schade aan het mastopzetstuk?"
	@Field((type) => Boolean, { nullable: true })
	mastAttachmentDamage?: boolean;

	// Maps to "Ontbrekende onderdelen aan de mastbeugel?"
	@Field((type) => Boolean, { nullable: true })
	mastBracketMissingParts?: boolean;

	// Maps to "Schade aan de mastbeugel?"
	@Field((type) => Boolean, { nullable: true })
	mastBracketDamage?: boolean;

	@Field((type) => String, { nullable: true })
	remarks?: string;

	@Field((type) => String, { nullable: true })
	createdAt?: string;

	@Field((type) => String, { nullable: true })
	updatedAt?: string;
}
