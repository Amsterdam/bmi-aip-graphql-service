import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { FindSpanMeasureOptionsQuery } from './queries/find-span-measure-options.query';
import { SpanMeasureOption } from './models/span-measure-option.model';
import { SpanMeasureItemOption } from './models/span-measure-item-option.model';

@Resolver((of) => SpanMeasureOption)
@Resource(SpanMeasureItemOption.name)
export class SpanMeasureOptionResolver {
	constructor(private queryBus: QueryBus) {}

	@Query(() => [SpanMeasureOption])
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async spanMeasureOptions(): Promise<SpanMeasureOption[]> {
		return this.queryBus.execute<FindSpanMeasureOptionsQuery>(new FindSpanMeasureOptionsQuery());
	}
}