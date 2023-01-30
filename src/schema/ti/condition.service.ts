import { Injectable } from '@nestjs/common';

import { Condition } from '../ti/models/condition.model';

import { ConditionFactory } from './condition.factory';
import { ConditionRepository } from './condition.repository';

@Injectable()
export class ConditionService {
	public constructor(private readonly conditionRepo: ConditionRepository) {}

	public async getConditions(surveyId: string): Promise<Condition[]> {
		return (await this.conditionRepo.getConditions(surveyId)).map((condition) =>
			ConditionFactory.CreateCondition(condition),
		);
	}
}
