import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsEnum, IsInt, IsOptional, MaxLength } from 'class-validator';
import { Point as PointType } from 'geojson';
import { Point } from 'graphql-geojson-scalar-types';

import { SupplierType } from '../types';

import { SpanDecompositionDataInput } from './span-decomposition-data.input';

@InputType()
export class BaseLuminaireInput {
	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public location?: string;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public hasLED?: boolean;

	@IsOptional()
	@IsInt()
	@Field({ nullable: true })
	public constructionYear?: number;

	@IsEnum(SupplierType)
	@IsOptional()
	@Field(() => String, { nullable: true })
	public supplierType?: SupplierType;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public manufacturer?: string;

	@IsOptional()
	@Field(() => Point, { nullable: true })
	geography?: PointType;

	@IsOptional()
	@Field(() => Point, { nullable: true })
	geographyRD?: PointType;

	@IsOptional()
	@Field({ nullable: true })
	public remarks?: string;

	// Driver

	@IsEnum(SupplierType)
	@IsOptional()
	@Field(() => String, { nullable: true })
	public driverSupplierType?: SupplierType;

	@IsOptional()
	@IsDate()
	@Field({ nullable: true })
	public driverCommissioningDate?: string;

	// Light Source

	@IsEnum(SupplierType)
	@IsOptional()
	@Field(() => String, { nullable: true })
	public lightSupplierType?: SupplierType;

	@IsOptional()
	@IsDate()
	@Field({ nullable: true })
	public lightCommissioningDate?: string;

	@IsOptional()
	@IsDate()
	@Field({ nullable: true })
	createdAt?: string;

	@IsOptional()
	@IsDate()
	@Field({ nullable: true })
	updatedAt?: string;

	@IsOptional()
	@IsDate()
	@Field({ nullable: true })
	deletedAt?: string;

	@IsOptional()
	@Field((type) => SpanDecompositionDataInput, { nullable: true })
	public spanDecompositionData?: SpanDecompositionDataInput;
}
