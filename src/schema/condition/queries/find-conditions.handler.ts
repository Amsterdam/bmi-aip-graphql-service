import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { ConditionService } from '../condition.service';
import { Condition } from '../models/condition.model';

import { FindConditionsQuery } from './find-conditions.query';

@QueryHandler(FindConditionsQuery)
export class FindConditionsHandler implements IQueryHandler<FindConditionsQuery> {
	constructor(private service: ConditionService) {}

	async execute({ surveyId }: FindConditionsQuery): Promise<Condition[]> {
		return this.service.findConditions(surveyId);
	}
}
