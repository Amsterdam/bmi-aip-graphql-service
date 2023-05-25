import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsInt, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { Point as PointType } from 'geojson';
import { Point } from 'graphql-geojson-scalar-types';

import { SupportSystemType } from '../types';

import { A11yDetailsInput } from './a11y-details.input';

@InputType()
export class BaseSupportSystemInput {
	@IsEnum(SupportSystemType)
	@Field((type) => SupportSystemType)
	public type: SupportSystemType;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public location?: string;

	@IsOptional()
	@IsInt()
	@Field({ nullable: true })
	public constructionYear?: number;

	@IsOptional()
	@Field(() => A11yDetailsInput, { nullable: true })
	public a11yDetails?: A11yDetailsInput;

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
	@Field(() => Point, { nullable: true })
	geographyRD?: PointType;

	@IsOptional()
	@IsNumber()
	@Field({ nullable: true })
	public installationHeight?: number;

	@IsOptional()
	@IsNumber()
	@Field({ nullable: true })
	public installationLength?: number;

	@IsOptional()
	@MaxLength(32)
	@Field({ nullable: true })
	public houseNumber?: string;

	@IsOptional()
	@Field({ nullable: true })
	createdAt?: Date;

	@IsOptional()
	@Field({ nullable: true })
	updatedAt?: Date;

	@IsOptional()
	@Field({ nullable: true })
	deletedAt?: Date;
}
