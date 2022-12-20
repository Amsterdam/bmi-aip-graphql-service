import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsUUID, MaxLength } from 'class-validator';

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
	@IsInt()
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
	@Field({ nullable: true })
	public quantityUnitOfMeasurement?: string;

	@Field()
	@IsUUID()
	public defaultMaintenanceMeasureId?: string;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public maintenanceType?: string;
}
