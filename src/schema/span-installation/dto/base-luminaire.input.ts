import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional, MaxLength } from 'class-validator';
import { Point as PointType } from 'geojson';
import { Point } from 'graphql-geojson-scalar-types';

import { SupplierType } from '../../../types';

@InputType()
export class BaseLuminaireInput {
	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public location?: string;

	@IsOptional()
	@IsInt()
	@Field({ nullable: true })
	public constructionYear?: number;

	@IsEnum(SupplierType)
	public supplierType?: SupplierType;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public manufacturer?: string;

	@IsOptional()
	@Field(() => Point, { nullable: true })
	geography?: PointType;

	@IsOptional()
	@Field({ nullable: true })
	public remarks?: string;

	// Driver

	@IsEnum(SupplierType)
	public driverSupplierType?: SupplierType;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public driverCommissioningDate?: Date;

	// Light Source

	@IsEnum(SupplierType)
	public lightSupplierType?: SupplierType;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public lightCommissioningDate?: Date;

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
