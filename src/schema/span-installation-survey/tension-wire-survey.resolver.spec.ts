import { MockedObjectDeep } from 'ts-jest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { TensionWireSurveyResolver } from './tension-wire-survey.resolver';
import { TensionWireSurveyService } from './tension-wire-survey.service';
import { TensionWireSurveyRepository } from './tension-wire-survey.repository';
import { domainTensionWireSurvey, createTensionWireSurveyInput, updateTensionWireSurveyInput } from './__stubs__';
import { CreateTensionWireSurveyCommand } from './commands/create-tension-wire-survey.command';
import { TensionWireSurvey } from './models/tension-wire-survey.model';
import { UpdateTensionWireSurveyCommand } from './commands/update-tension-wire-survey.command';
import { GetTensionWireSurveyQuery } from './queries/get-tension-wire-survey.query';

jest.mock('./tension-wire-survey.service');
jest.mock('./tension-wire-survey.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateTensionWireSurveyCommand.name:
			case UpdateTensionWireSurveyCommand.name:
				return domainTensionWireSurvey;
		}
	}),
	...(<any>{}),
});

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((query: any) => {
		switch (query.constructor.name) {
			case GetTensionWireSurveyQuery.name:
				return domainTensionWireSurvey;
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const tensionWireSurveyRepo = new TensionWireSurveyRepository(prismaServiceMock);

const supportSystemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('Span Installation Survey / Tension Wire / Resolver', () => {
	describe('createTensionWireSurvey', () => {
		test('creates and returns a TensionWireSurvey object', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new TensionWireSurveyResolver(
				new TensionWireSurveyService(tensionWireSurveyRepo),
				commandBusMock,
				queryBusMock,
			);
			const result = await resolver.createTensionWireSurvey(createTensionWireSurveyInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(
				new CreateTensionWireSurveyCommand(createTensionWireSurveyInput),
			);

			expect(result).toBeInstanceOf(TensionWireSurvey);
			expect(typeof result.id).toBe('string');
		});
	});

	describe('updateTensionWireSurvey', () => {
		test('updates and returns a TensionWireSurvey object', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new TensionWireSurveyResolver(
				new TensionWireSurveyService(tensionWireSurveyRepo),
				commandBusMock,
				queryBusMock,
			);
			const result = await resolver.updateTensionWireSurvey(updateTensionWireSurveyInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(
				new UpdateTensionWireSurveyCommand(updateTensionWireSurveyInput),
			);

			expect(result).toBeInstanceOf(TensionWireSurvey);
			expect(result.id).toBe(updateTensionWireSurveyInput.id);
		});
	});

	test('getTensionWireSurvey returns a single TensionWireSurvey object', async () => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new TensionWireSurveyResolver(
			new TensionWireSurveyService(tensionWireSurveyRepo),
			commandBusMock,
			queryBusMock,
		);
		expect(await resolver.getTensionWireSurvey(supportSystemId)).toEqual(domainTensionWireSurvey);
	});
});
