import { Args, Query, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { SpanMeasureService } from './span-measure.service';
import { SpanMeasure } from './models/span-measure.model';
import { FindSpanMeasuresQuery } from './queries/find-span-measures.query';

@Resolver((of) => SpanMeasure)
@Resource(SpanMeasure.name)
export class SpanMeasureResolver {
	constructor(
		private spanMeasureService: SpanMeasureService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@Query(() => [SpanMeasure])
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async spanMeasures(@Args('surveyId') surveyId: string): Promise<SpanMeasure[]> {
		return this.queryBus.execute<FindSpanMeasuresQuery>(new FindSpanMeasuresQuery(surveyId));
	}
}
