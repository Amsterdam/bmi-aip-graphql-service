import { Injectable } from '@nestjs/common';

import { ConditionFactory } from './condition.factory';
import { ConditionRepository } from './condition.repository';

@Injectable()
export class ConditionService {
	public constructor(private readonly conditionRepo: ConditionRepository) {}

	public async getCondition(surveyId: string) {
		return ConditionFactory.CreateCondition(await this.conditionRepo.getCondition(surveyId));
	}
}
