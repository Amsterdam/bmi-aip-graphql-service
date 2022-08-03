import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsInt, IsJSON, IsOptional, MaxLength } from 'class-validator';
import { Point as PointType } from 'geojson';

import { SupportSystemType, SupportSystemTypeDetailed } from '../../../types';

@InputType()
export class BaseSupportSystemInput {
	@IsEnum(SupportSystemType)
	@Field()
	public type: SupportSystemType;

	@IsEnum(SupportSystemTypeDetailed)
	@Field()
	public typeDetailed: SupportSystemTypeDetailed;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public location?: string;

	@IsOptional()
	@IsInt()
	@Field({ nullable: true })
	public constructionYear?: number;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public a11yDetails?: string;

	@IsOptional()
	@Field({ nullable: true })
	public remarks?: string;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public locationIndication?: string;

	@IsOptional()
	@IsJSON()
	@Field({ nullable: true })
	geography?: PointType;

	@IsOptional()
	@IsInt()
	@Field({ nullable: true })
	public installationHeight?: number;

	@IsOptional()
	@MaxLength(32)
	@Field({ nullable: true })
	public houseNumber?: string;
}
