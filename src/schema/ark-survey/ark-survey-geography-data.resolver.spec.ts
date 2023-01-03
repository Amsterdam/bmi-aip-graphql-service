import { MockedObjectDeep } from 'ts-jest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { ArkSurveyGeographyDataResolver } from './ark-survey-geography-data.resolver';
import { ArkSurveyGeographyDataService } from './ark-survey-geography-data.service';
import { ArkSurveyGeographyDataRepository } from './ark-survey-geography-data.repository';
import {
	domainArkSurveyGeographyData,
	createArkSurveyGeographyDataInput,
	deletedArkSurveyGeographyData,
} from './__stubs__';
import { CreateArkSurveyGeographyDataCommand } from './commands/create-ark-survey-geography-data.command';
import { ArkSurveyGeographyData } from './models/ark-survey-geography-data.model';
import { UpdateArkSurveyGeographyDataCommand } from './commands/update-ark-survey-geography-data.command';
import { DeleteArkSurveyGeographyDataCommand } from './commands/delete-ark-survey-geography-data.command';
import { FindArkSurveyGeographyDataQuery } from './queries/find-ark-survey-geography-data.query';

jest.mock('./ark-survey-geography-data.service');
jest.mock('./ark-survey-geography-data.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateArkSurveyGeographyDataCommand.name:
			case UpdateArkSurveyGeographyDataCommand.name:
				return domainArkSurveyGeographyData;
			case DeleteArkSurveyGeographyDataCommand.name:
				return deletedArkSurveyGeographyData;
		}
	}),
	...(<any>{}),
});

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((query: any) => {
		switch (query.constructor.name) {
			case FindArkSurveyGeographyDataQuery.name:
				return [domainArkSurveyGeographyData, domainArkSurveyGeographyData];
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const ArkSurveyGeographyDataRepo = new ArkSurveyGeographyDataRepository(prismaServiceMock);

describe('Span Installation / ArkSurveyGeographyData / Resolver', () => {
	describe('createArkSurveyGeographyData', () => {
		test('creates and returns an element', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new ArkSurveyGeographyDataResolver(
				new ArkSurveyGeographyDataService(ArkSurveyGeographyDataRepo),
				commandBusMock,
				queryBusMock,
			);
			const result = await resolver.createArkSurveyGeographyData(createArkSurveyGeographyDataInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(
				new CreateArkSurveyGeographyDataCommand(createArkSurveyGeographyDataInput),
			);

			expect(result).toBeInstanceOf(ArkSurveyGeographyData);
			expect(typeof result.id).toBe('string');
		});
	});

	test('getSurveyArkSurveyGeographyData returns an array of ArkSurveyGeographyData objects', async () => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new ArkSurveyGeographyDataResolver(
			new ArkSurveyGeographyDataService(ArkSurveyGeographyDataRepo),
			commandBusMock,
			queryBusMock,
		);
		const elements = await resolver.arkSurveyGeographyData('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(elements).toEqual([domainArkSurveyGeographyData, domainArkSurveyGeographyData]);
	});
});
