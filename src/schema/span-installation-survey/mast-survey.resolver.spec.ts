import { MockedObjectDeep } from 'ts-jest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { MastSurveyResolver } from './mast-survey.resolver';
import { MastSurveyService } from './mast-survey.service';
import { MastSurveyRepository } from './mast-survey.repository';
import { domainMastSurvey, createMastSurveyInput, updateMastSurveyInput } from './__stubs__';
import { CreateMastSurveyCommand } from './commands/create-mast-survey.command';
import { MastSurvey } from './models/mast-survey.model';
import { UpdateMastSurveyCommand } from './commands/update-mast-survey.command';
import { GetMastSurveyQuery } from './queries/get-mast-survey.query';

jest.mock('./mast-survey.service');
jest.mock('./mast-survey.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateMastSurveyCommand.name:
			case UpdateMastSurveyCommand.name:
				return domainMastSurvey;
		}
	}),
	...(<any>{}),
});

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((query: any) => {
		switch (query.constructor.name) {
			case GetMastSurveyQuery.name:
				return domainMastSurvey;
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const mastSurveyRepo = new MastSurveyRepository(prismaServiceMock);

const supportSystemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('Span Installation Survey / Mast / Resolver', () => {
	describe('createMastSurvey', () => {
		test('creates and returns a MastSurvey object', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new MastSurveyResolver(
				new MastSurveyService(mastSurveyRepo),
				commandBusMock,
				queryBusMock,
			);
			const result = await resolver.createMastSurvey(createMastSurveyInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateMastSurveyCommand(createMastSurveyInput));

			expect(result).toBeInstanceOf(MastSurvey);
			expect(typeof result.id).toBe('string');
		});
	});

	describe('updateMastSurvey', () => {
		test('updates and returns a MastSurvey object', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new MastSurveyResolver(
				new MastSurveyService(mastSurveyRepo),
				commandBusMock,
				queryBusMock,
			);
			const result = await resolver.updateMastSurvey(updateMastSurveyInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new UpdateMastSurveyCommand(updateMastSurveyInput));

			expect(result).toBeInstanceOf(MastSurvey);
			expect(result.id).toBe(updateMastSurveyInput.id);
		});
	});

	test('getMastSurvey returns a single MastSurvey object', async () => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new MastSurveyResolver(new MastSurveyService(mastSurveyRepo), commandBusMock, queryBusMock);
		expect(await resolver.getMastSurvey(supportSystemId)).toEqual(domainMastSurvey);
	});
});
