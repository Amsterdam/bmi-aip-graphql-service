import { MockedObjectDeep } from 'ts-jest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { JunctionBoxSurveyResolver } from './junction-box-survey.resolver';
import { JunctionBoxSurveyService } from './junction-box-survey.service';
import { JunctionBoxSurveyRepository } from './junction-box-survey.repository';
import { domainJunctionBoxSurvey, createJunctionBoxSurveyInput, updateJunctionBoxSurveyInput } from './__stubs__';
import { CreateJunctionBoxSurveyCommand } from './commands/create-junction-box-survey.command';
import { JunctionBoxSurvey } from './models/junction-box-survey.model';
import { UpdateJunctionBoxSurveyCommand } from './commands/update-junction-box-survey.command';
import { GetJunctionBoxSurveyQuery } from './queries/get-junction-box-survey.query';

jest.mock('./junction-box-survey.service');
jest.mock('./junction-box-survey.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateJunctionBoxSurveyCommand.name:
			case UpdateJunctionBoxSurveyCommand.name:
				return domainJunctionBoxSurvey;
		}
	}),
	...(<any>{}),
});

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((query: any) => {
		switch (query.constructor.name) {
			case GetJunctionBoxSurveyQuery.name:
				return domainJunctionBoxSurvey;
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const junctionBoxSurveyRepo = new JunctionBoxSurveyRepository(prismaServiceMock);

const surveyId = '82580f03-5fe9-4554-aa85-6c0fe28a693d';
const supportSystemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('Span Installation Survey / JunctionBox / Resolver', () => {
	describe('createJunctionBoxSurvey', () => {
		test('creates and returns a JunctionBoxSurvey object', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new JunctionBoxSurveyResolver(
				new JunctionBoxSurveyService(junctionBoxSurveyRepo),
				commandBusMock,
				queryBusMock,
			);
			const result = await resolver.createJunctionBoxSurvey(createJunctionBoxSurveyInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(
				new CreateJunctionBoxSurveyCommand(createJunctionBoxSurveyInput),
			);

			expect(result).toBeInstanceOf(JunctionBoxSurvey);
			expect(typeof result.id).toBe('string');
		});
	});

	describe('updateJunctionBoxSurvey', () => {
		test('updates and returns a JunctionBoxSurvey object', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new JunctionBoxSurveyResolver(
				new JunctionBoxSurveyService(junctionBoxSurveyRepo),
				commandBusMock,
				queryBusMock,
			);
			const result = await resolver.updateJunctionBoxSurvey(updateJunctionBoxSurveyInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(
				new UpdateJunctionBoxSurveyCommand(updateJunctionBoxSurveyInput),
			);

			expect(result).toBeInstanceOf(JunctionBoxSurvey);
			expect(result.id).toBe(updateJunctionBoxSurveyInput.id);
		});
	});

	test('getJunctionBoxSurvey returns a single JunctionBoxSurvey object', async () => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new JunctionBoxSurveyResolver(
			new JunctionBoxSurveyService(junctionBoxSurveyRepo),
			commandBusMock,
			queryBusMock,
		);
		expect(await resolver.getJunctionBoxSurvey(surveyId, supportSystemId)).toEqual(domainJunctionBoxSurvey);
	});
});
