import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@InputType()
export class BaseConditionInput {
	@IsOptional()
	@Field({ nullable: true })
	advice: string;

	@IsOptional()
	@Field({ nullable: true })
	cost: number;

	@IsOptional()
	@IsInt()
	@Field({ nullable: true })
	costYear?: number;

	@IsOptional()
	@Field({ nullable: true })
	score?: string;

	@IsOptional()
	@Field({ nullable: true })
	careScore: string;

	@IsOptional()
	@Field({ nullable: true })
	investigationPriority?: string;

	@IsOptional()
	@Field({ nullable: true })
	craInspectionRemarks?: string;

	@IsOptional()
	@Field({ nullable: true })
	craInitialScore?: number;

	@IsOptional()
	@Field({ nullable: true })
	craHistoryScore?: number;

	@IsOptional()
	@Field({ nullable: true })
	craInspectionScore?: number;

	@IsOptional()
	@Field({ nullable: true })
	craInitialRemarks?: string;

	@IsOptional()
	@Field({ nullable: true })
	craHistoryRemarks?: string;

	@IsOptional()
	@Field({ nullable: true })
	craInitialUnityCheck?: number;

	@IsOptional()
	@Field({ nullable: true })
	craHistoryUnityCheck?: number;

	@IsOptional()
	@Field({ nullable: true })
	ramsMaxTotalPriority?: string;

	@IsOptional()
	@Field({ nullable: true })
	ramsMaxWeightedPriority?: string;

	@IsOptional()
	@Field({ nullable: true })
	isFurtherInvestigation?: boolean;

	@IsOptional()
	@Field({ nullable: true })
	created_at?: Date;

	@IsOptional()
	@Field({ nullable: true })
	updated_at?: Date;
}
