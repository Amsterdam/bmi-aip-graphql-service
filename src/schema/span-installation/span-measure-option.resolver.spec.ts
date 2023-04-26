import { Query, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { SpanMeasure } from './models/span-measure.model';
import { FindSpanMeasureOptionsQuery } from './queries/find-span-measure-options.query';

@Resolver((of) => SpanMeasure)
@Resource(SpanMeasure.name)
export class SpanMeasureResolver {
	constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

	@Query((returns) => [SpanMeasure], { name: 'spanMeasures' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	async getAllSpanMeasures() {
		return this.queryBus.execute<FindSpanMeasureOptionsQuery>(new FindSpanMeasureOptionsQuery());
	}
}
