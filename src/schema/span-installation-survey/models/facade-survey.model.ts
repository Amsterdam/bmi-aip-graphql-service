import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'facadeSurvey' })
export class FacadeSurvey {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	supportSystemId: string;

	// Maps to "Schade op gevel binnen 1 m van gevelbevestiging?"
	@Field((type) => Boolean, { nullable: true })
	facadeDamageWithin1m?: boolean;

	// Maps to "Belemmerende/belastende begroeiing bij overspanningsinstallatie?"
	@Field((type) => Boolean, { nullable: true })
	hinderingVegetation?: boolean;

	// Maps to "Schade aan muurplaat?"
	@Field((type) => Boolean, { nullable: true })
	wallPlateDamage?: boolean;

	// Maps to "Onjuiste montage?"
	@Field((type) => Boolean, { nullable: true })
	faultyMontage?: boolean;

	// Maps to "Moer niet volledig over draadeind?"
	@Field((type) => Boolean, { nullable: true })
	nutNotFullyOverThreadedRod?: boolean;

	// Maps to "Ontbrekende bevestigingsmaterialen?"
	@Field((type) => Boolean, { nullable: true })
	missingFasteners?: boolean;

	// Maps to "Gemeten voorspanning"
	@Field((type) => Int, { nullable: true })
	measuredPreload?: number;

	// Maps to "Toegepaste additionele trekkracht"
	@Field((type) => Int, { nullable: true })
	appliedAdditionalTraction?: number;

	// Maps to "Gevelverbinding gefaald?"
	@Field((type) => Boolean, { nullable: true })
	facadeConnectionFailed?: boolean;

	// Maps to "Additionele trekkracht waarbij gevelverbinding faalde"
	@Field((type) => Int, { nullable: true })
	facadeConnectionFailureAdditionalTraction?: number;

	@Field((type) => String, { nullable: true })
	remarks?: string;

	@Field((type) => Boolean, { nullable: true })
	hasDamage?: string;

	@Field((type) => String, { nullable: true })
	createdAt?: string;

	@Field((type) => String, { nullable: true })
	updatedAt?: string;
}
