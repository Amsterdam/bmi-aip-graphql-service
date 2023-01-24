import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ReachSegment } from '../reach-segment/models/reach-segment.model';
import { FindReachSegmentsQuery } from '../reach-segment/queries/find-reach-segments.query';

import { ArkSurvey } from './models/ark-survey.model';
import { ArkSurveyFactory } from './ark-survey.factory';
import { ArkSurveyService } from './ark-survey.service';
import { CreateArkSurveyInput } from './dto/create-ark-survey.input';
import { UpdateArkSurveyInput } from './dto/update-ark-survey.input';
import { CreateArkSurveyCommand } from './commands/create-ark-survey.command';
import { UpdateArkSurveyCommand } from './commands/update-ark-survey.command';
import { ArkSurvey as DomainArkSurvey } from './types/ark-survey.repository.interface';
import { DeleteArkSurveyCommand } from './commands/delete-ark-survey.command';
import { FindArkSurveyQuery } from './queries/find-ark-survey.query';
import { SaveArkSurveyCommand } from './commands/save-ark-survey.command';
import { FindArkSurveyReachSegmentsCommand } from './commands/find-ark-survey-reach-segments.command';
import { GetArkSurveyBySurveyIdQuery } from './queries/get-ark-survey-by-survey-id.query';

@Resolver((of) => ArkSurvey)
@Resource(ArkSurvey.name)
export class ArkSurveyResolver {
	constructor(
		private arkSurveyService: ArkSurveyService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@Mutation(() => ArkSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async createArkSurvey(@Args('createArkSurvey') input: CreateArkSurveyInput): Promise<ArkSurvey> {
		const domainArkSurvey: DomainArkSurvey = await this.commandBus.execute<CreateArkSurveyCommand>(
			new CreateArkSurveyCommand(input),
		);
		return ArkSurveyFactory.createArkSurvey(domainArkSurvey);
	}

	@Mutation(() => ArkSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateArkSurvey(@Args('updateArkSurvey') input: UpdateArkSurveyInput): Promise<ArkSurvey> {
		const domainArkSurvey: DomainArkSurvey = await this.commandBus.execute<UpdateArkSurveyCommand>(
			new UpdateArkSurveyCommand(input),
		);
		return ArkSurveyFactory.createArkSurvey(domainArkSurvey);
	}

	@Mutation(() => ArkSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async saveArkSurvey(@Args('saveArkSurvey') input: UpdateArkSurveyInput): Promise<ArkSurvey> {
		const domainArkSurvey: DomainArkSurvey = await this.commandBus.execute<SaveArkSurveyCommand>(
			new SaveArkSurveyCommand(input),
		);
		return ArkSurveyFactory.createArkSurvey(domainArkSurvey);
	}

	@Mutation(() => ArkSurvey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async deleteArkSurvey(@Args('identifier') identifier: string): Promise<ArkSurvey> {
		const domainArkSurvey: DomainArkSurvey = await this.commandBus.execute<DeleteArkSurveyCommand>(
			new DeleteArkSurveyCommand(identifier),
		);
		return ArkSurveyFactory.createArkSurvey(domainArkSurvey);
	}

	@Query((returns) => ArkSurvey, { name: 'getArkSurvey' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	async getArkSurvey(@Args('surveyId', { type: () => String }) surveyId: string) {
		return this.arkSurveyService.getArkSurveyData(surveyId);
	}

	// @Query(() => ArkSurvey)
	// @Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	// public async getArkSurvey(@Args('surveyId') surveyId: string): Promise<ArkSurvey> {
	// 	return this.queryBus.execute<GetArkSurveyBySurveyIdQuery>(new GetArkSurveyBySurveyIdQuery(surveyId));
	// }

	@ResolveField()
	async reachSegments(@Parent() { id }: ArkSurvey): Promise<ReachSegment[]> {
		return this.commandBus.execute<FindArkSurveyReachSegmentsCommand>(new FindArkSurveyReachSegmentsCommand(id));
	}
}
