import { MockedObjectDeep } from 'ts-jest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { FacadeSurveyResolver } from './facade-survey.resolver';
import { FacadeSurveyService } from './facade-survey.service';
import { FacadeSurveyRepository } from './facade-survey.repository';
import { domainFacadeSurvey, createFacadeSurveyInput, updateFacadeSurveyInput } from './__stubs__';
import { CreateFacadeSurveyCommand } from './commands/create-facade-survey.command';
import { FacadeSurvey } from './models/facade-survey.model';
import { UpdateFacadeSurveyCommand } from './commands/update-facade-survey.command';
import { GetFacadeSurveyQuery } from './queries/get-facade-survey.query';

jest.mock('./facade-survey.service');
jest.mock('./facade-survey.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateFacadeSurveyCommand.name:
			case UpdateFacadeSurveyCommand.name:
				return domainFacadeSurvey;
		}
	}),
	...(<any>{}),
});

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((query: any) => {
		switch (query.constructor.name) {
			case GetFacadeSurveyQuery.name:
				return domainFacadeSurvey;
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const facadeSurveyRepo = new FacadeSurveyRepository(prismaServiceMock);

const surveyId = '82580f03-5fe9-4554-aa85-6c0fe28a693d';
const supportSystemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('Span Installation Survey / Facade / Resolver', () => {
	describe('createFacadeSurvey', () => {
		test('creates and returns a FacadeSurvey object', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new FacadeSurveyResolver(
				new FacadeSurveyService(facadeSurveyRepo),
				commandBusMock,
				queryBusMock,
			);
			const result = await resolver.createFacadeSurvey(createFacadeSurveyInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateFacadeSurveyCommand(createFacadeSurveyInput));

			expect(result).toBeInstanceOf(FacadeSurvey);
			expect(typeof result.id).toBe('string');
		});
	});

	describe('updateFacadeSurvey', () => {
		test('updates and returns a FacadeSurvey object', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new FacadeSurveyResolver(
				new FacadeSurveyService(facadeSurveyRepo),
				commandBusMock,
				queryBusMock,
			);
			const result = await resolver.updateFacadeSurvey(updateFacadeSurveyInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new UpdateFacadeSurveyCommand(updateFacadeSurveyInput));

			expect(result).toBeInstanceOf(FacadeSurvey);
			expect(result.id).toBe(updateFacadeSurveyInput.id);
		});
	});

	test('getFacadeSurvey returns a single FacadeSurvey object', async () => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new FacadeSurveyResolver(
			new FacadeSurveyService(facadeSurveyRepo),
			commandBusMock,
			queryBusMock,
		);
		expect(await resolver.getFacadeSurvey(surveyId, supportSystemId)).toEqual(domainFacadeSurvey);
	});
});
