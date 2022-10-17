import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'facadeSurvey' })
export class FacadeSurvey {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	supportSystemId: string;

	// Maps to "Schade op gevel binnen 1 m van gevelbevestiging?"
	@Field((type) => Boolean)
	facadeDamageWithin1m: boolean;

	// Maps to "Belemmerende/belastende begroeiing bij overspanningsinstallatie?"
	@Field((type) => Boolean)
	hinderingVegetation: boolean;

	// Maps to "Schade aan muurplaat?"
	@Field((type) => Boolean)
	wallPlateDamage: boolean;

	// Maps to "Onjuiste montage?"
	@Field((type) => Boolean)
	faultyMontage: boolean;

	// Maps to "Moer niet volledig over draadeind?"
	@Field((type) => Boolean)
	nutNotFullyOverThreadedRod: boolean;

	// Maps to "Ontbrekende bevestigingsmaterialen?"
	@Field((type) => Boolean)
	missingFasteners: boolean;

	// Maps to "Gemeten voorspanning"
	@Field((type) => Int)
	measuredPreload: number;

	// Maps to "Toegepaste additionele trekkracht"
	@Field((type) => Int)
	appliedAdditionalTraction: number;

	// Maps to "Gevelverbinding gefaald?"
	@Field((type) => Boolean)
	facadeConnectionFailed: boolean;

	// Maps to "Additionele trekkracht waarbij gevelverbinding faalde"
	@Field((type) => Int)
	facadeConnectionFailureAdditionalTraction: number;

	@Field((type) => String, { nullable: true })
	remarks?: string;

	@Field((type) => String, { nullable: true })
	createdAt?: string;

	@Field((type) => String, { nullable: true })
	updatedAt?: string;
}
