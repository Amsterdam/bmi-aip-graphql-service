import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ArkSurveyGeographyData } from './models/ark-survey-geography-data.model';
import { ArkSurveyGeographyDataFactory } from './ark-survey-geography-data.factory';
import { ArkSurveyGeographyDataService } from './ark-survey-geography-data.service';
import { CreateArkSurveyGeographyDataInput } from './dto/create-ark-survey-geography-data.input';
import { UpdateArkSurveyGeographyDataInput } from './dto/update-ark-survey-geography-data.input';
import { CreateArkSurveyGeographyDataCommand } from './commands/create-ark-survey-geography-data.command';
import { UpdateArkSurveyGeographyDataCommand } from './commands/update-ark-survey-geography-data.command';
import { ArkSurveyGeographyData as DomainArkSurveyGeographyData } from './types/ark-survey-geography-data.repository.interface';
import { DeleteArkSurveyGeographyDataCommand } from './commands/delete-ark-survey-geography-data.command';
import { FindArkSurveyGeographyDataQuery } from './queries/find-ark-survey-geography-data.query';

@Resolver((of) => ArkSurveyGeographyData)
@Resource(ArkSurveyGeographyData.name)
export class ArkSurveyGeographyDataResolver {
	constructor(
		private arkSurveyGeographyDataService: ArkSurveyGeographyDataService,
		private commandBus: CommandBus,
		private queryBus: QueryBus,
	) {}

	@Mutation(() => ArkSurveyGeographyData)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async createArkSurveyGeographyData(
		@Args('createArkSurveyGeographyData') input: CreateArkSurveyGeographyDataInput,
	): Promise<ArkSurveyGeographyData> {
		const domainArkSurveyGeographyData: DomainArkSurveyGeographyData =
			await this.commandBus.execute<CreateArkSurveyGeographyDataCommand>(
				new CreateArkSurveyGeographyDataCommand(input),
			);
		return ArkSurveyGeographyDataFactory.createArkSurveyGeographyData(domainArkSurveyGeographyData);
	}

	@Mutation(() => ArkSurveyGeographyData)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async updateArkSurveyGeographyData(
		@Args('updateArkSurveyGeographyData') input: UpdateArkSurveyGeographyDataInput,
	): Promise<ArkSurveyGeographyData> {
		const domainArkSurveyGeographyData: DomainArkSurveyGeographyData =
			await this.commandBus.execute<UpdateArkSurveyGeographyDataCommand>(
				new UpdateArkSurveyGeographyDataCommand(input),
			);
		return ArkSurveyGeographyDataFactory.createArkSurveyGeographyData(domainArkSurveyGeographyData);
	}

	@Mutation(() => ArkSurveyGeographyData)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async deleteArkSurveyGeographyData(@Args('identifier') identifier: string): Promise<ArkSurveyGeographyData> {
		const domainArkSurveyGeographyData: DomainArkSurveyGeographyData =
			await this.commandBus.execute<DeleteArkSurveyGeographyDataCommand>(
				new DeleteArkSurveyGeographyDataCommand(identifier),
			);
		return ArkSurveyGeographyDataFactory.createArkSurveyGeographyData(domainArkSurveyGeographyData);
	}

	@Query((returns) => [ArkSurveyGeographyData], { name: 'arkSurveyGeographyData' })
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	async arkSurveyGeographyData(@Args('surveyId', { type: () => String }) surveyId: string) {
		return this.queryBus.execute<FindArkSurveyGeographyDataQuery>(new FindArkSurveyGeographyDataQuery(surveyId));
	}
}
