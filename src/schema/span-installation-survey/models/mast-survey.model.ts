import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'mastSurvey' })
export class MastSurvey {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	supportSystemId: string;

	// Maps to "Schade aan de mast?"
	@Field((type) => Boolean)
	mastDamage: boolean;

	// Maps to "Ontbrekende onderdelen aan de mast?"
	@Field((type) => Boolean)
	mastMissingParts: boolean;

	// Maps to "Hoek van de spanmast"
	@Field((type) => Float, { nullable: true })
	tensionMastAngle?: number;

	// Maps to "Schade aan het mastopzetstuk?"
	@Field((type) => Boolean)
	mastAttachmentDamage: boolean;

	// Maps to "Ontbrekende onderdelen aan de mastbeugel?"
	@Field((type) => Boolean)
	mastBracketMissingParts: boolean;

	// Maps to "Schade aan de mastbeugel?"
	@Field((type) => Boolean)
	mastBracketDamage: boolean;

	@Field((type) => String, { nullable: true })
	remarks?: string;

	@Field((type) => String, { nullable: true })
	createdAt?: string;

	@Field((type) => String, { nullable: true })
	updatedAt?: string;
}
