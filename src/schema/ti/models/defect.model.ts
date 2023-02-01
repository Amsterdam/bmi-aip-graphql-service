import { Field, ID, ObjectType } from '@nestjs/graphql';

import { RepairAdviceCategory } from '../types';

import { Condition } from './condition.model';

@ObjectType({ description: 'defect' })
export class Defect {
	@Field((type) => ID)
	id: string;

	@Field((type) => String)
	conditionId: string;

	@Field((type) => Condition)
	condition: Condition;

	@Field((type) => Defect)
	defect: Defect;

	@Field((type) => String, { nullable: true })
	name?: string;

	@Field((type) => String, { nullable: true })
	code?: string;

	@Field((type) => String, { nullable: true })
	description?: string;

	// 1, 2 or 3
	@Field((type) => Number, { nullable: true })
	seriousness?: number;

	// 1, 2 or 3
	@Field((type) => Number, { nullable: true })
	intensity?: number;

	// 1, 2, 3, 4 or 5
	@Field((type) => Number, { nullable: true })
	extend?: number;

	// TODO convert repairAdviceCategory database column from TEXT to VARCHAR(32)
	@Field((type) => String, { nullable: true })
	repairAdviceCategory?: RepairAdviceCategory;

	@Field((type) => String, { nullable: true })
	repairDate?: string;

	@Field((type) => String, { nullable: true })
	material?: string;

	// TODO Create enum and migrate existing data to compatible EN strings
	@Field((type) => String, { nullable: true })
	cause?: string;

	@Field((type) => String, { nullable: true })
	aspect?: string;

	@Field((type) => String, { nullable: true })
	repairAdvice?: string;

	@Field((type) => Number, { nullable: true })
	amount?: number;

	@Field((type) => Number, { nullable: true })
	amountTotal?: number;

	@Field((type) => String, { nullable: true })
	measuringUnit?: string;

	@Field((type) => String, { nullable: true })
	measuringUnitAbbreviation?: string;

	@Field((type) => Number, { nullable: true })
	score?: number;

	// TODO determine if this is worthy of an enum
	@Field((type) => String, { nullable: true })
	defectType?: string;

	@Field((type) => String, { nullable: true })
	locationDescription?: string;

	@Field((type) => String, { nullable: true })
	details?: string;

	// TODO Create migration to rename the riscLevel column to riskLevel
	@Field((type) => String, { nullable: true })
	riskLevel?: string;

	@Field((type) => String, { nullable: true })
	ramsR?: string;

	@Field((type) => String, { nullable: true })
	ramsA?: string;

	@Field((type) => String, { nullable: true })
	ramsM?: string;

	@Field((type) => String, { nullable: true })
	ramsS?: string;

	@Field((type) => Number, { nullable: true })
	careScore?: number;

	@Field((type) => String, { nullable: true })
	ramsEc?: string;

	@Field((type) => String, { nullable: true })
	ramsEnv?: string;

	@Field((type) => String, { nullable: true })
	ramsTotalPriority?: string;

	@Field((type) => String, { nullable: true })
	ramsWeightedPriority?: string;

	@Field((type) => String, { nullable: true })
	createdAt?: string;

	@Field((type) => String, { nullable: true })
	updatedAt?: string;
}
