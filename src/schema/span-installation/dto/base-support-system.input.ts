import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional, MaxLength } from 'class-validator';
import { Point as PointType } from 'geojson';
import { Point } from 'graphql-geojson-scalar-types';

import { SupportSystemType, SupportSystemTypeDetailed } from '../../../types';

@InputType()
export class BaseSupportSystemInput {
	@IsEnum(SupportSystemType)
	@Field((type) => SupportSystemType)
	public type: SupportSystemType;

	@IsEnum(SupportSystemTypeDetailed)
	@Field((type) => SupportSystemTypeDetailed)
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
	@Field(() => Point, { nullable: true })
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
