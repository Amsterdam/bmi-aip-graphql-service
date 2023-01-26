import { Injectable } from '@nestjs/common';

import { Condition } from './models/condition.model';
import { ConditionFactory } from './condition.factory';
import { ConditionRepository } from './condition.repository';

@Injectable()
export class ConditionService {
	public constructor(private readonly conditionRepo: ConditionRepository) {}

	async findConditions(surveyId: string): Promise<Condition[]> {
		return (await this.conditionRepo.findConditions(surveyId)).map((condition) =>
			ConditionFactory.CreateCondition(condition),
		);
	}
}
