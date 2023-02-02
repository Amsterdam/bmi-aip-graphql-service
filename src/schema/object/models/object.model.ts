import { Field, Float, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType({ description: 'object' })
export class ObjectModel {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	name: string;

	@Field((type) => String, { nullable: true })
	code?: string;

	@Field((type) => String, { nullable: true })
	location?: string;

	@Field((type) => Float, { nullable: true })
	latitude?: number;

	@Field((type) => Float, { nullable: true })
	longitude?: number;

	@Field((type) => String, { nullable: true })
	updatedOn?: string;

	@Field((type) => Boolean)
	compositionIsVisible: boolean;

	@Field((type) => String, { nullable: true })
	clientCompanyId?: string;

	@Field((type) => String, { nullable: true })
	operatorCompanyId?: string;

	@Field((type) => String, { nullable: true })
	surveyorCompanyId?: string;

	@Field((type) => String, { nullable: false })
	objectTypeId: string;

	@Field((type) => String, { nullable: true })
	created_at?: string;

	@Field((type) => String, { nullable: true })
	updated_at?: string;

	@Field((type) => String, { nullable: true })
	inspectionStandardId?: string;

	@Field((type) => String, { nullable: true })
	ownerCompanyId?: string;

	@Field((type) => String, { nullable: true })
	customerVersion?: string;

	@Field((type) => Boolean)
	isPublic: boolean;

	@Field((type) => Boolean)
	isDemo: boolean;

	@Field((type) => String, { nullable: true })
	siteId?: string;

	@Field((type) => Number, { nullable: true })
	constructionYear?: number;

	@Field((type) => String, { nullable: true })
	externalRefId?: string;

	@Field((type) => String, { nullable: true })
	useage?: string;

	@Field((type) => String, { nullable: true })
	managementOrganization?: string;

	@Field((type) => String, { nullable: true })
	shape?: string;

	@Field((type) => Number, { nullable: true })
	shapeSrid?: number;

	@Field((type) => String, { nullable: true })
	status?: string;

	@Field((type) => String, { nullable: true })
	effortCategory?: string;

	@Field((type) => Number, { nullable: true })
	effortCalculation?: number;

	@Field((type) => String, { nullable: true })
	trafficType?: string;

	@Field((type) => String, { nullable: true })
	mainMaterial?: string;

	@Field((type) => String, { nullable: true })
	marineInfrastrutureType?: string;

	@Field((type) => Float, { nullable: true })
	length?: number;

	@Field((type) => Float, { nullable: true })
	width?: number;

	@Field((type) => Float, { nullable: true })
	squareMeters?: number;

	@Field((type) => GraphQLJSON, { nullable: true })
	attributes?: JSON;
}
