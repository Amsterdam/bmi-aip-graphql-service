import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, MaxLength } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class BaseAssetInput {
	@Field()
	@MaxLength(255)
	public name: string;

	@Field()
	@MaxLength(255)
	public code: string;

	@IsOptional()
	@Field({ nullable: true })
	@MaxLength(255)
	public location: string;

	@IsNumber()
	@Field({ nullable: true })
	public latitude: number;

	@IsNumber()
	@Field({ nullable: true })
	public longitude: number;

	@Field({ nullable: true })
	public updatedOn: Date;

	@IsBoolean()
	@Field()
	public compositionIsVisible: boolean;

	@Field()
	public clientCompanyId: string;

	@Field()
	public operatorCompanyId: string;

	@Field()
	public surveyorCompanyId: string;

	@Field()
	public objectTypeId: string;

	@Field()
	public inspectionStandardId: string;

	@Field()
	public ownerCompanyId: string;

	@Field()
	@MaxLength(255)
	public customerVersion: string;

	@Field()
	@IsBoolean()
	public isPublic: boolean;

	@Field()
	@IsBoolean()
	public isDemo: boolean;

	@Field()
	public siteId: string;

	@Field({ nullable: true })
	public constructionYear?: number;

	@Field({ nullable: true })
	public externalRefId?: string;

	@Field()
	public useage: string;

	@Field()
	public managementOrganization: string;

	@Field({ nullable: true })
	public shape?: string;

	@Field({ nullable: true })
	public shapeSrid?: number;

	@Field({ nullable: true })
	public status?: string;

	@Field({ nullable: true })
	public effortCategory?: string;

	@Field({ nullable: true })
	public effortCalculation?: number;

	@Field({ nullable: true })
	public trafficType?: string;

	@Field({ nullable: true })
	public mainMaterial?: string;

	@Field({ nullable: true })
	public marineInfrastrutureType?: string;

	@IsNumber()
	@Field({ nullable: true })
	public length?: number;

	@IsNumber()
	@Field({ nullable: true })
	public width?: number;

	@IsNumber()
	@Field({ nullable: true })
	public squareMeters?: number;

	@Field(() => GraphQLJSON, { nullable: true })
	public attributes?: string;
}
