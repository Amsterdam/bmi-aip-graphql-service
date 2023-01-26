import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'luminaireSurvey' })
export class LuminaireSurvey {
	@Field((type) => ID)
	id: string;

	@Field((type) => String)
	luminaireId: string;

	// Maps to "Schade aan armatuur?"
	@Field((type) => Boolean, { nullable: true })
	luminaireDamage?: boolean;

	@Field((type) => String, { nullable: true })
	remarks?: string;

	@Field((type) => String, { nullable: true })
	createdAt?: string;

	@Field((type) => String, { nullable: true })
	updatedAt?: string;
}
