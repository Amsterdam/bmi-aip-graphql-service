import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'element' })
export class Element {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	name: string;

	@Field((type) => String)
	objectId: string;

	@Field((type) => String)
	surveyId: string;

	@Field((type) => String, { nullable: true })
	gisibId?: string;

	@Field((type) => String, { nullable: true })
	conditionId?: string;

	@Field((type) => String, { nullable: true })
	observationPointId?: string;

	@Field((type) => String, { nullable: true })
	code?: string;

	@Field((type) => String, { nullable: true })
	location?: string;

	@Field((type) => String, { nullable: true })
	categoryId?: string;

	@Field((type) => Number, { nullable: true })
	constructionYear?: number;

	@Field((type) => String, { nullable: true })
	constructionType?: string;

	@Field((type) => String, { nullable: true })
	elementGroupName?: string;

	@Field((type) => Boolean)
	isArchived: boolean;

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

	@Field((type) => String, { nullable: true })
	deletedAt: string;
}
