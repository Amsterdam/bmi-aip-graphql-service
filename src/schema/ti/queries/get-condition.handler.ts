import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { ConditionService } from '../condition.service';

import { GetConditionQuery } from './get-condition.query';

@QueryHandler(GetConditionQuery)
export class GetConditionHandler implements IQueryHandler<GetConditionQuery> {
	constructor(private service: ConditionService) {}

	async execute({ conditionId }: GetConditionQuery) {
		return this.service.getCondition(conditionId);
	}
}
