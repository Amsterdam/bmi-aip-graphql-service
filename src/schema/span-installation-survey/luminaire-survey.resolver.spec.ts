import { MockedObjectDeep } from 'ts-jest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { LuminaireSurveyResolver } from './luminaire-survey.resolver';
import { LuminaireSurveyService } from './luminaire-survey.service';
import { LuminaireSurveyRepository } from './luminaire-survey.repository';
import { domainLuminaireSurvey, createLuminaireSurveyInput, updateLuminaireSurveyInput } from './__stubs__';
import { CreateLuminaireSurveyCommand } from './commands/create-luminaire-survey.command';
import { LuminaireSurvey } from './models/luminaire-survey.model';
import { UpdateLuminaireSurveyCommand } from './commands/update-luminaire-survey.command';
import { GetLuminaireSurveyQuery } from './queries/get-luminaire-survey.query';

jest.mock('./luminaire-survey.service');
jest.mock('./luminaire-survey.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateLuminaireSurveyCommand.name:
			case UpdateLuminaireSurveyCommand.name:
				return domainLuminaireSurvey;
		}
	}),
	...(<any>{}),
});

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((query: any) => {
		switch (query.constructor.name) {
			case GetLuminaireSurveyQuery.name:
				return domainLuminaireSurvey;
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const luminaireSurveyRepo = new LuminaireSurveyRepository(prismaServiceMock);

const luminaireId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('Span Installation Survey / Luminaire / Resolver', () => {
	describe('createLuminaireSurvey', () => {
		test('creates and returns a LuminaireSurvey object', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new LuminaireSurveyResolver(
				new LuminaireSurveyService(luminaireSurveyRepo),
				commandBusMock,
				queryBusMock,
			);
			const result = await resolver.createLuminaireSurvey(createLuminaireSurveyInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(
				new CreateLuminaireSurveyCommand(createLuminaireSurveyInput),
			);

			expect(result).toBeInstanceOf(LuminaireSurvey);
			expect(typeof result.id).toBe('string');
		});
	});

	describe('updateLuminaireSurvey', () => {
		test('updates and returns a LuminaireSurvey object', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new LuminaireSurveyResolver(
				new LuminaireSurveyService(luminaireSurveyRepo),
				commandBusMock,
				queryBusMock,
			);
			const result = await resolver.updateLuminaireSurvey(updateLuminaireSurveyInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(
				new UpdateLuminaireSurveyCommand(updateLuminaireSurveyInput),
			);

			expect(result).toBeInstanceOf(LuminaireSurvey);
			expect(result.id).toBe(updateLuminaireSurveyInput.id);
		});
	});

	test('getLuminaireSurvey returns a single LuminaireSurvey object', async () => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new LuminaireSurveyResolver(
			new LuminaireSurveyService(luminaireSurveyRepo),
			commandBusMock,
			queryBusMock,
		);
		expect(await resolver.getLuminaireSurvey(luminaireId)).toEqual(domainLuminaireSurvey);
	});
});
