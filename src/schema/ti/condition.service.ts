import { Injectable } from '@nestjs/common';

import { ConditionFactory } from './condition.factory';
import { ConditionRepository } from './condition.repository';
import { Condition } from './models/condition.model';

@Injectable()
export class ConditionService {
	public constructor(private readonly conditionRepo: ConditionRepository) {}

	public async getCondition(conditionId: string) {
		return ConditionFactory.CreateCondition(await this.conditionRepo.getCondition(conditionId));
	}

	public async getConditions(surveyId: string): Promise<Condition[]> {
		return (await this.conditionRepo.getConditions(surveyId)).map((condition) =>
			ConditionFactory.CreateCondition(condition),
		);
	}
}
