import { Prisma } from '@prisma/client';

import { CreateConditionInput } from '../dto/create-condition.input';
import { UpdateConditionInput } from '../dto/update-condition.input';

const conditions = Prisma.validator<Prisma.conditionsArgs>()({
	select: {
		id: true,
		surveyId: true,
		elementId: true,
		unitId: true,
		manifestationId: true,
		score: true,
		advice: true,
		cost: true,
		costYear: true,
		careScore: true,
		investigationPriority: true,
		craInspectionRemarks: true,
		craInitialScore: true,
		craHistoryScore: true,
		craInspectionScore: true,
		craInitialRemarks: true,
		craHistoryRemarks: true,
		craInitialUnityCheck: true,
		craHistoryUnityCheck: true,
		ramsMaxTotalPriority: true,
		ramsMaxWeightedPriority: true,
		isFurtherInvestigation: true,
		created_at: true,
		updated_at: true,
	},
});
export type Condition = Prisma.conditionsGetPayload<typeof conditions>;

export interface IConditionRepository {
	getConditions(surveyId: string): Promise<Condition[]>;
	getCondition(id: string): Promise<Condition | null>;
	createCondition(input: CreateConditionInput): Promise<Condition>;
	updateCondition(input: UpdateConditionInput): Promise<Condition>;
}
