import { MockedObjectDeep } from 'ts-jest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';
import { domainSupportSystem } from '../span-installation/__stubs__';

import { SurveyResolver } from './survey.resolver';
import { domainSurvey, surveyInput } from './__stubs__';
import { CreateSurveyCommand } from './commands/create-survey.command';
import { GetSurveyByIdQuery } from './queries/get-survey-by-id.query';

jest.mock('./survey.service');
jest.mock('./survey.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateSurveyCommand.name:
				return domainSurvey;
		}
	}),
	...(<any>{}),
});

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((query: any) => {
		switch (query.constructor.name) {
			case GetSurveyByIdQuery.name:
				return [domainSupportSystem, domainSupportSystem];
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

describe('Survey / Resolver', () => {
	describe('createSurvey', () => {
		test('create a survey', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new SurveyResolver(prismaServiceMock, commandBusMock, queryBusMock);
			const result = await resolver.createSurvey(surveyInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateSurveyCommand(surveyInput));
			expect(typeof result.id).toBe('string');
		});
	});
});
