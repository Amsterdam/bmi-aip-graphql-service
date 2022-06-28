import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'unit' })
export class Unit {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	name: string;

	@Field((type) => String, { nullable: true })
	code?: string;

	@Field((type) => String, { nullable: true })
	location?: string;

	@Field((type) => String)
	objectId: string;

	@Field((type) => String)
	surveyId: string;

	@Field((type) => Number, { nullable: true })
	gisibId?: number;

	@Field((type) => String)
	elementId: string;

	@Field((type) => String, { nullable: true })
	conditionId?: string;

	@Field((type) => String, { nullable: true })
	observationPointId?: string;

	@Field((type) => String, { nullable: true })
	material?: string;

	@Field((type) => Number, { nullable: true })
	quantity?: number;

	@Field((type) => String, { nullable: true })
	quantityUnitOfMeasurement?: string;

	@Field((type) => Number, { nullable: true })
	constructionYear?: number;

	@Field((type) => Boolean)
	isElectrical: boolean;

	@Field((type) => Boolean)
	isElectricalObjectSpecific: boolean;

	@Field((type) => Boolean)
	isStructural: boolean;

	@Field((type) => Boolean)
	isStructuralObjectSpecific: boolean;

	@Field((type) => Boolean)
	isRelevant: boolean;
}
