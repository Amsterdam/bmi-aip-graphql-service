import { MockedObjectDeep } from 'ts-jest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { ArkSurveyResolver } from './ark-survey.resolver';
import { ArkSurveyService } from './ark-survey.service';
import { ArkSurveyRepository } from './ark-survey.repository';
import { domainArkSurvey, createArkSurveyInput, deletedArkSurvey, updateArkSurveyInput } from './__stubs__';
import { CreateArkSurveyCommand } from './commands/create-ark-survey.command';
import { ArkSurvey } from './models/ark-survey.model';
import { UpdateArkSurveyCommand } from './commands/update-ark-survey.command';
import { DeleteArkSurveyCommand } from './commands/delete-ark-survey.command';
import { SaveArkSurveyCommand } from './commands/save-ark-survey.command';
import { GetArkSurveyBySurveyIdQuery } from './queries/get-ark-survey-by-survey.query';

jest.mock('./ark-survey.service');
jest.mock('./ark-survey.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateArkSurveyCommand.name:
			case SaveArkSurveyCommand.name:
			case UpdateArkSurveyCommand.name:
				return domainArkSurvey;
			case DeleteArkSurveyCommand.name:
				return deletedArkSurvey;
		}
	}),
	...(<any>{}),
});

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((query: any) => {
		switch (query.constructor.name) {
			case GetArkSurveyBySurveyIdQuery.name:
				return domainArkSurvey;
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const ArkSurveyRepo = new ArkSurveyRepository(prismaServiceMock);

describe('ARK / ArkSurvey / Resolver', () => {
	describe('createArkSurvey', () => {
		test('creates and returns an element', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new ArkSurveyResolver(new ArkSurveyService(ArkSurveyRepo), commandBusMock, queryBusMock);
			const result = await resolver.createArkSurvey(createArkSurveyInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateArkSurveyCommand(createArkSurveyInput));

			expect(result).toBeInstanceOf(ArkSurvey);
			expect(typeof result.id).toBe('string');
		});
	});

	describe('saveArkSurvey', () => {
		test('creates and returns an element if it does not exist', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new ArkSurveyResolver(new ArkSurveyService(ArkSurveyRepo), commandBusMock, queryBusMock);
			const result = await resolver.saveArkSurvey(updateArkSurveyInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new SaveArkSurveyCommand(updateArkSurveyInput));

			expect(result).toBeInstanceOf(ArkSurvey);
			expect(typeof result.id).toBe('string');
		});

		test('updates an element if it already does exists', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new ArkSurveyResolver(new ArkSurveyService(ArkSurveyRepo), commandBusMock, queryBusMock);
			await resolver.saveArkSurvey(updateArkSurveyInput);

			const result = await resolver.saveArkSurvey(updateArkSurveyInput);
			updateArkSurveyInput.arkGeographyStart = {
				type: 'Point',
				coordinates: [53.370302853062604, 4.893996915500548],
			};

			expect(commandBusMock.execute).toHaveBeenCalledTimes(2);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new SaveArkSurveyCommand(updateArkSurveyInput));

			expect(result).toBeInstanceOf(ArkSurvey);
			expect(typeof result.id).toBe('string');
		});
	});

	test('getArkSurvey returns an ArkSurvey object', async () => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new ArkSurveyResolver(new ArkSurveyService(ArkSurveyRepo), commandBusMock, queryBusMock);
		const elements = await resolver.getArkSurvey('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');

		const object = {
			...domainArkSurvey,
		};

		expect(elements).toEqual(object);
	});
});
