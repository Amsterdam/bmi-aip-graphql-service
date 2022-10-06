import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'tensionWireSurvey' })
export class TensionWireSurvey {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	surveyId: string;

	@Field((type) => String)
	supportSystemId: string;

	@Field((type) => Boolean)
	tensionWireDamage: boolean;

	@Field((type) => Boolean)
	thirdPartyObjectsAttached: boolean;

	@Field((type) => Boolean)
	gaffTerminalDamage: boolean;

	@Field((type) => Boolean)
	gaffTerminalMissingParts: boolean;

	@Field((type) => Boolean)
	faultyMontage: boolean;

	@Field((type) => Boolean)
	tensionWireClampDamage: boolean;

	@Field((type) => String, { nullable: true })
	remarks?: string;

	@Field((type) => String, { nullable: true })
	createdAt?: string;

	@Field((type) => String, { nullable: true })
	updatedAt?: string;
}
