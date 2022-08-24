import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { Survey } from './models/survey.model';
import { GetSurveyByIdQuery } from './queries/get-survey-by-id.query';
import { GetSurveysByObjectIdQuery } from './queries/get-surveys-by-object-id.query';
import { CreateSurveyInput } from './dto/create-survey.input';
import { CreateSurveyCommand } from './commands/create-survey.command';

/*
	This resolver is just for illustrating
	that the prisma implementation is working, Maybe can removed in future
*/

@Resolver((of) => Survey)
export class SurveyResolver {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Query((returns) => Survey)
	public async getSurveyById(@Args('id') id: string): Promise<Survey> {
		return this.queryBus.execute<GetSurveyByIdQuery>(new GetSurveyByIdQuery(id));
	}

	@Query((returns) => [Survey])
	public async getSurveysByObjectId(@Args('objectId') objectId: string): Promise<Survey[]> {
		return this.queryBus.execute<GetSurveysByObjectIdQuery>(new GetSurveysByObjectIdQuery(objectId));
	}

	@Mutation((returns) => Survey)
	public async createSurvey(@Args('createSurveyInput') input: CreateSurveyInput): Promise<Survey> {
		return this.commandBus.execute<CreateSurveyCommand>(new CreateSurveyCommand(input));
	}
}
