import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional, MaxLength } from 'class-validator';
import { Point as PointType } from 'geojson';

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
	@Field({ nullable: true })
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
	public driverCommissioningDate?: string;

	// Light Source

	@IsEnum(SupplierType)
	public lightSupplierType?: SupplierType;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public lightCommissioningDate?: string;
}
