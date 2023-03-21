import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsInt, IsNumber, IsOptional, IsUUID, MaxLength } from 'class-validator';

import { CyclicMeasureTypes } from '../types/cyclic-measure';
import { QuantityUnitOfMeasurement } from '../types/measure';

@InputType()
export class BaseCyclicMeasureInput {
	@IsOptional()
	@IsInt()
	@Field({ nullable: true })
	public planYear?: number;

	@IsOptional()
	@IsInt()
	@Field({ nullable: true })
	public finalPlanYear?: number;

	@IsOptional()
	@IsNumber()
	@Field({ nullable: true })
	public costSurcharge?: number;

	@IsOptional()
	@Field({ nullable: true })
	public remarks?: string;

	@IsOptional()
	@Field({ nullable: true })
	public cycle?: number;

	@IsOptional()
	@Field({ nullable: true })
	public unitPrice?: number;

	@IsOptional()
	@IsEnum(QuantityUnitOfMeasurement)
	@Field({ nullable: true })
	public quantityUnitOfMeasurement?: string;

	@IsOptional()
	@Field()
	@IsUUID()
	public failureModeId?: string;

	@IsOptional()
	@Field()
	@IsUUID()
	public defectId?: string;

	@IsOptional()
	@IsEnum(CyclicMeasureTypes)
	@MaxLength(128)
	@Field({ nullable: true })
	public maintenanceType?: string;

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
