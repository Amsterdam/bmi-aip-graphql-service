import { MockedObjectDeep } from 'ts-jest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { NodeSurveyResolver } from './node-survey.resolver';
import { NodeSurveyService } from './node-survey.service';
import { NodeSurveyRepository } from './node-survey.repository';
import { domainNodeSurvey, createNodeSurveyInput, updateNodeSurveyInput } from './__stubs__';
import { CreateNodeSurveyCommand } from './commands/create-node-survey.command';
import { NodeSurvey } from './models/node-survey.model';
import { UpdateNodeSurveyCommand } from './commands/update-node-survey.command';
import { GetNodeSurveyQuery } from './queries/get-node-survey.query';

jest.mock('./node-survey.service');
jest.mock('./node-survey.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateNodeSurveyCommand.name:
			case UpdateNodeSurveyCommand.name:
				return domainNodeSurvey;
		}
	}),
	...(<any>{}),
});

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((query: any) => {
		switch (query.constructor.name) {
			case GetNodeSurveyQuery.name:
				return domainNodeSurvey;
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const nodeSurveyRepo = new NodeSurveyRepository(prismaServiceMock);

const surveyId = '82580f03-5fe9-4554-aa85-6c0fe28a693d';
const supportSystemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('Span Installation Survey / Node / Resolver', () => {
	describe('createNodeSurvey', () => {
		test('creates and returns a NodeSurvey object', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new NodeSurveyResolver(
				new NodeSurveyService(nodeSurveyRepo),
				commandBusMock,
				queryBusMock,
			);
			const result = await resolver.createNodeSurvey(createNodeSurveyInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateNodeSurveyCommand(createNodeSurveyInput));

			expect(result).toBeInstanceOf(NodeSurvey);
			expect(typeof result.id).toBe('string');
		});
	});

	describe('updateNodeSurvey', () => {
		test('updates and returns a NodeSurvey object', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new NodeSurveyResolver(
				new NodeSurveyService(nodeSurveyRepo),
				commandBusMock,
				queryBusMock,
			);
			const result = await resolver.updateNodeSurvey(updateNodeSurveyInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new UpdateNodeSurveyCommand(updateNodeSurveyInput));

			expect(result).toBeInstanceOf(NodeSurvey);
			expect(result.id).toBe(updateNodeSurveyInput.id);
		});
	});

	test('getNodeSurvey returns a single NodeSurvey object', async () => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new NodeSurveyResolver(new NodeSurveyService(nodeSurveyRepo), commandBusMock, queryBusMock);
		expect(await resolver.getNodeSurvey(surveyId, supportSystemId)).toEqual(domainNodeSurvey);
	});
});
