import { Condition } from './models/condition.model';
import { Condition as DomainCondition } from './types/condition.repository.interface';
import { CreateConditionInput } from './dto/create-condition.input';

export class ConditionFactory {
	static CreateCondition({
		id,
		surveyId,
		elementId,
		unitId,
		manifestationId,
		score,
		advice,
		cost,
		costYear,
		careScore,
		investigationPriority,
		craInspectionRemarks,
		craInitialScore,
		craHistoryScore,
		craInspectionScore,
		craInitialRemarks,
		craHistoryRemarks,
		craInitialUnityCheck,
		craHistoryUnityCheck,
		ramsMaxTotalPriority,
		ramsMaxWeightedPriority,
		isFurtherInvestigation,
		created_at: createdAt,
		updated_at: updatedAt,
	}: DomainCondition): Condition {
		const condition = new Condition();
		condition.id = id;
		condition.surveyId = surveyId;
		condition.elementId = elementId;
		condition.unitId = unitId;
		condition.manifestationId = manifestationId;
		condition.score = score;
		condition.advice = advice;
		condition.cost = cost;
		condition.costYear = costYear;
		condition.careScore = careScore;
		condition.investigationPriority = investigationPriority;
		condition.craInspectionRemarks = craInspectionRemarks;
		condition.craInitialScore = craInitialScore;
		condition.craHistoryScore = craHistoryScore;
		condition.craInspectionScore = craInspectionScore;
		condition.craInitialRemarks = craInitialRemarks;
		condition.craHistoryRemarks = craHistoryRemarks;
		condition.craInitialUnityCheck = Number(craInitialUnityCheck);
		condition.craHistoryUnityCheck = Number(craHistoryUnityCheck);
		condition.ramsMaxTotalPriority = ramsMaxTotalPriority;
		condition.ramsMaxWeightedPriority = ramsMaxWeightedPriority;
		condition.isFurtherInvestigation = isFurtherInvestigation;
		condition.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		condition.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;
		return condition;
	}

	static CreateConditionInput(unitId: string): CreateConditionInput {
		const condition = new CreateConditionInput();
		condition.unitId = unitId;
		return condition;
	}
}
