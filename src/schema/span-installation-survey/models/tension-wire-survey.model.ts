import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'tensionWireSurvey' })
export class TensionWireSurvey {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	supportSystemId: string;

	// Maps to "Schade aan spandraad?"
	@Field((type) => Boolean, { nullable: true })
	tensionWireDamage?: boolean;

	// Maps to "Objecten van derden aan spandraad bevestigd?"
	@Field((type) => Boolean, { nullable: true })
	thirdPartyObjectsAttached?: boolean;

	// Maps to "Schade aan gaffelterminal?"
	@Field((type) => Boolean, { nullable: true })
	gaffTerminalDamage?: boolean;

	// Maps to "Ontbrekende onderdelen aan gaffelterminal?"
	@Field((type) => Boolean, { nullable: true })
	gaffTerminalMissingParts?: boolean;

	// Maps to "Onjuiste montage?"
	@Field((type) => Boolean, { nullable: true })
	faultyMontage?: boolean;

	// Maps to "Schade aan spandraadklem?"
	@Field((type) => Boolean, { nullable: true })
	tensionWireClampDamage?: boolean;

	@Field((type) => String, { nullable: true })
	remarks?: string;

	@Field((type) => Boolean, { nullable: true })
	hasDamage?: string;

	@Field((type) => String, { nullable: true })
	createdAt?: string;

	@Field((type) => String, { nullable: true })
	updatedAt?: string;
}
