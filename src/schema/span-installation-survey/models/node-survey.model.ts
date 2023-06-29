import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'nodeSurvey' })
export class NodeSurvey {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	supportSystemId: string;

	// Maps to "Schade aan de node?"
	@Field((type) => Boolean, { nullable: true })
	nodeDamage?: boolean;

	@Field((type) => String, { nullable: true })
	remarks?: string;

	@Field((type) => Boolean, { nullable: true })
	hasDamage?: string;

	@Field((type) => String, { nullable: true })
	createdAt?: string;

	@Field((type) => String, { nullable: true })
	updatedAt?: string;
}
