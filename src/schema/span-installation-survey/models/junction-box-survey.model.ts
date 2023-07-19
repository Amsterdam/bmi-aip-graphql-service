import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'junctionBoxSurvey' })
export class JunctionBoxSurvey {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	junctionBoxId: string;

	// Maps to "Schade aan aansluitkabel?"
	@Field((type) => Boolean, { nullable: true })
	cableDamage?: boolean;

	// Maps to "Onjuiste montage aan spandraad?"
	@Field((type) => Boolean, { nullable: true })
	faultyMontageTensionWire?: boolean;

	// Maps to "Onjuiste montage aan gevel?"
	@Field((type) => Boolean, { nullable: true })
	faultyMontageFacade?: boolean;

	// Maps to "Schade aan aansluitkast?"
	@Field((type) => Boolean, { nullable: true })
	junctionBoxDamage?: boolean;

	// Maps to "Sticker met identificatienummer onbruikbaar/onleesbaar?"
	@Field((type) => Boolean, { nullable: true })
	stickerNotReadable?: boolean;

	@Field((type) => String, { nullable: true })
	remarks?: string;

	@Field((type) => Boolean, { nullable: true })
	hasDamage?: string;

	@Field((type) => String, { nullable: true })
	createdAt?: string;

	@Field((type) => String, { nullable: true })
	updatedAt?: string;
}
