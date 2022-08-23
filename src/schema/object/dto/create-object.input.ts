import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsUUID, MaxLength } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateObjectInput {
	@Field()
	@IsUUID()
	public id: string;

	@Field()
	@MaxLength(255)
	public name: string;

	@Field()
	@MaxLength(255)
	public code?: string;

	@IsOptional()
	@Field({ nullable: true })
	@MaxLength(255)
	public location?: string;

	// @IsOptional()
	// @Field({ nullable: true })
	// public latitude?: number;
	//
	// @IsOptional()
	// @Field({ nullable: true })
	// public longitude?: number;

	@IsOptional()
	@Field({ nullable: true })
	public updatedOn?: string;

	@IsBoolean()
	@Field()
	public compositionIsVisible: boolean;

	@IsOptional()
	@Field({ nullable: true })
	public clientCompanyId?: string;

	@IsOptional()
	@Field({ nullable: true })
	public operatorCompanyId?: string;

	@IsOptional()
	@Field({ nullable: true })
	public surveyorCompanyId?: string;

	@IsOptional()
	@Field({ nullable: false })
	public objectTypeId?: string;

	@IsOptional()
	@Field({ nullable: true })
	public created_at?: string;

	@IsOptional()
	@Field({ nullable: true })
	public updated_at?: string;

	@IsOptional()
	@Field({ nullable: true })
	public inspectionStandardId?: string;

	@IsOptional()
	@Field({ nullable: true })
	public ownerCompanyId?: string;

	@IsOptional()
	@Field({ nullable: true })
	@MaxLength(255)
	public customerVersion?: string;

	@Field()
	@IsBoolean()
	public isPublic: boolean;

	@Field()
	@IsBoolean()
	public isDemo: boolean;

	@Field()
	public siteId: string;

	@IsOptional()
	@Field({ nullable: true })
	public constructionYear?: number;

	@IsOptional()
	@Field({ nullable: true })
	public externalRefId?: string;

	@IsOptional()
	@Field({ nullable: true })
	public useage?: string;

	@IsOptional()
	@Field({ nullable: true })
	public managementOrganization?: string;

	@IsOptional()
	@Field({ nullable: true })
	public shape?: string;

	@IsOptional()
	@Field({ nullable: true })
	public shapeSrid?: number;

	@IsOptional()
	@Field({ nullable: true })
	public status?: string;

	@IsOptional()
	@Field({ nullable: true })
	public effortCategory?: string;

	@IsOptional()
	@Field({ nullable: true })
	public effortCalculation?: number;

	@IsOptional()
	@Field({ nullable: true })
	public trafficType?: string;

	@IsOptional()
	@Field({ nullable: true })
	public mainMaterial?: string;

	@IsOptional()
	@Field({ nullable: true })
	public marineInfrastrutureType?: string;

	// @IsOptional()
	// @Field({ nullable: true })
	// public length?: number;
	//
	// @IsOptional()
	// @Field({ nullable: true })
	// public width?: number;
	//
	// @IsOptional()
	// @Field({ nullable: true })
	// public squareMeters?: number;

	@IsOptional()
	@Field(() => GraphQLJSON, { nullable: true })
	public attributes?: JSONValue;
}

type JSONValue =
	// | JSONValuestring
	// | number
	// | boolean
	// | null
	// | { [x: string]: JSONValue }
	Array<JSONValue>;
