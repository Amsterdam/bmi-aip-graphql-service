import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Resource, RoleMatchingMode, Roles } from 'nest-keycloak-connect';

import { PrismaService } from '../../prisma.service';

import { Survey } from './models/survey.model';
import { GetSurveyByIdQuery } from './queries/get-survey-by-id.query';
import { GetSurveysByObjectIdQuery } from './queries/get-surveys-by-object-id.query';
import { CreateSurveyInput } from './dto/create-survey.input';
import { CreateSurveyCommand } from './commands/create-survey.command';

@Resolver((of) => Survey)
@Resource(Survey.name)
export class SurveyResolver {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Query(() => Survey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async getSurveyById(@Args('id') id: string): Promise<Survey> {
		return this.queryBus.execute<GetSurveyByIdQuery>(new GetSurveyByIdQuery(id));
	}

	@Query(() => [Survey])
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async getSurveysByObjectId(@Args('objectId') objectId: string): Promise<Survey[]> {
		return this.queryBus.execute<GetSurveysByObjectIdQuery>(new GetSurveysByObjectIdQuery(objectId));
	}

	@Mutation(() => Survey)
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async createSurvey(@Args('createSurveyInput') input: CreateSurveyInput): Promise<Survey> {
		return this.commandBus.execute<CreateSurveyCommand>(new CreateSurveyCommand(input));
	}
}
