import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ReachSegment } from './models/ark-reach-segment.model';
import { ReachSegmentFactory } from './ark-reach-segment.factory';
import { ReachSegmentService } from './ark-reach-segment.service';
import { CreateReachSegmentInput } from './dto/create-reach-segment.input';
import { UpdateReachSegmentInput } from './dto/update-reach-segment.input';
import { CreateReachSegmentCommand } from './commands/create-reach-segment.command';
import { UpdateReachSegmentCommand } from './commands/update-reach-segment.command';
import { ReachSegment as DomainReachSegment } from './types/reach-segment.repository.interface';
import { DeleteReachSegmentCommand } from './commands/delete-reach-segment.command';
import { FindReachSegmentsQuery } from './queries/find-reach-segments.query';

@Resolver((of) => ReachSegment)
@Resource(ReachSegment.name)
export class ReachSegmentResolver {
	constructor(
		private reachSegmentService: ReachSegmentService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@Mutation(() => ReachSegment)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async createReachSegment(@Args('createReachSegment') input: CreateReachSegmentInput): Promise<ReachSegment> {
		const domainReachSegment: DomainReachSegment = await this.commandBus.execute<CreateReachSegmentCommand>(
			new CreateReachSegmentCommand(input),
		);
		return ReachSegmentFactory.CreateReachSegment(domainReachSegment);
	}

	@Mutation(() => ReachSegment)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateReachSegment(@Args('updateReachSegment') input: UpdateReachSegmentInput): Promise<ReachSegment> {
		const domainReachSegment: DomainReachSegment = await this.commandBus.execute<UpdateReachSegmentCommand>(
			new UpdateReachSegmentCommand(input),
		);
		return ReachSegmentFactory.CreateReachSegment(domainReachSegment);
	}

	@Mutation(() => ReachSegment)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async deleteReachSegment(@Args('identifier') identifier: string): Promise<ReachSegment> {
		const domainReachSegment: DomainReachSegment = await this.commandBus.execute<DeleteReachSegmentCommand>(
			new DeleteReachSegmentCommand(identifier),
		);
		return ReachSegmentFactory.CreateReachSegment(domainReachSegment);
	}

	@Query((returns) => [ReachSegment], { name: 'reachSegments' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	async arkSurveyReachSegments(@Args('surveyId', { type: () => String }) surveyId: string) {
		return this.queryBus.execute<FindReachSegmentsQuery>(new FindReachSegmentsQuery(surveyId));
	}
}
