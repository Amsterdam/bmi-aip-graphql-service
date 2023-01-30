import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Resource } from 'nest-keycloak-connect';
import { QueryBus } from '@nestjs/cqrs';

import { Defect } from './models/defect.model';
import { Condition } from './models/condition.model';
import { GetConditionQuery } from './queries/get-condition.query';

@Resolver((of) => Defect)
@Resource(Defect.name)
export class DefectResolver {
	constructor(private queryBus: QueryBus) {}

	@ResolveField()
	defect(@Parent() { conditionId }: Defect): Promise<Condition> {
		return this.queryBus.execute<GetConditionQuery>(new GetConditionQuery(conditionId));
	}
}
