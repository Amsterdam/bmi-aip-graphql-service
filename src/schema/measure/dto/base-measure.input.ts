import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional, IsUUID, MaxLength } from 'class-validator';

import { MeasureTypes, QuantityUnitOfMeasurement } from '../types/measure';

@InputType()
export class BaseMeasureInput {
	@IsOptional()
	@IsInt()
	@Field({ nullable: true })
	public planYear?: number;

	@IsOptional()
	@IsInt()
	@Field({ nullable: true })
	public finalPlanYear?: number;

	@IsOptional()
	@IsInt()
	@Field({ nullable: true })
	public costSurcharge?: number;

	@IsOptional()
	@Field({ nullable: true })
	public description?: string;

	@IsOptional()
	@Field({ nullable: true })
	public location?: string;

	@IsOptional()
	@Field({ nullable: true })
	public unitPrice?: number;

	@IsOptional()
	@IsEnum(QuantityUnitOfMeasurement)
	@Field({ nullable: true })
	public quantityUnitOfMeasurement?: string;

	@IsOptional()
	@Field({ nullable: true })
	public quantity?: number;

	@IsOptional()
	@IsEnum(MeasureTypes)
	@MaxLength(128)
	@Field({ nullable: true })
	public maintenanceType?: string;

	@Field()
	@IsUUID()
	@IsOptional()
	public manifestationId?: string;

	@Field()
	@IsUUID()
	public failureModeId?: string;

	@Field()
	@IsUUID()
	@IsOptional()
	public defectId?: string;

	@Field()
	@IsUUID()
	public surveyScopeId?: string;
}
