import { MockedObjectDeep } from 'ts-jest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { SupportSystemResolver } from './support-system.resolver';
import { SupportSystemService } from './support-system.service';
import { SupportSystemRepository } from './support-system.repository';
import {
	domainSupportSystem,
	createSupportSystemInput,
	updateSupportSystemInput,
	deletedSupportSystem,
	supportSystem1,
	supportSystem2,
} from './__stubs__';
import { CreateSupportSystemCommand } from './commands/create-support-system.command';
import { SupportSystem } from './models/support-system.model';
import { UpdateSupportSystemCommand } from './commands/update-support-system.command';
import { DeleteSupportSystemCommand } from './commands/delete-support-system.command';
import { LuminaireRepository } from './luminaire.repository';
import { FindSupportSystemsQuery } from './queries/find-support-systems.query';
import { CloneSupportSystemsFromOVSSurveyCommand } from './commands/clone-support-systems-from-ovs-survey.command';

jest.mock('./support-system.service');
jest.mock('./support-system.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateSupportSystemCommand.name:
			case UpdateSupportSystemCommand.name:
				return domainSupportSystem;
			case DeleteSupportSystemCommand.name:
				return deletedSupportSystem;
			case CloneSupportSystemsFromOVSSurveyCommand.name:
				return [supportSystem1, supportSystem2];
		}
	}),
	...(<any>{}),
});

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((query: any) => {
		switch (query.constructor.name) {
			case FindSupportSystemsQuery.name:
				return [domainSupportSystem, domainSupportSystem];
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const luminaireRepositoryMock: MockedObjectDeep<LuminaireRepository> = {
	...(<any>{}),
};

const supportSystemRepo = new SupportSystemRepository(prismaServiceMock, luminaireRepositoryMock);

describe('Span Installation / SupportSystem / Resolver', () => {
	describe('createSupportSystem', () => {
		test('creates and returns an element', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new SupportSystemResolver(
				new SupportSystemService(supportSystemRepo),
				commandBusMock,
				queryBusMock,
			);
			const result = await resolver.createSupportSystem(createSupportSystemInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(
				new CreateSupportSystemCommand(createSupportSystemInput),
			);

			expect(result).toBeInstanceOf(SupportSystem);
			expect(typeof result.id).toBe('string');
		});
	});

	describe('updateSupportSystem', () => {
		test('updates and returns a support system', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new SupportSystemResolver(
				new SupportSystemService(supportSystemRepo),
				commandBusMock,
				queryBusMock,
			);
			const result = await resolver.updateSupportSystem(updateSupportSystemInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(
				new UpdateSupportSystemCommand(updateSupportSystemInput),
			);

			expect(result).toBeInstanceOf(SupportSystem);
			expect(result.id).toBe(updateSupportSystemInput.id);
		});
	});

	describe('deleteSupportSystem', () => {
		test('soft-deletes and returns a support system', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new SupportSystemResolver(
				new SupportSystemService(supportSystemRepo),
				commandBusMock,
				queryBusMock,
			);
			const result = await resolver.deleteSupportSystem(domainSupportSystem.id);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new DeleteSupportSystemCommand(domainSupportSystem.id));

			expect(result).toBeInstanceOf(SupportSystem);
			expect(result.id).toBe(domainSupportSystem.id);
			expect(result.deletedAt).toBe('Thu, 09 Jun 2022 15:03:22 GMT');
		});
	});

	test('getSurveySupportSystems returns an array of support system objects', async () => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new SupportSystemResolver(
			new SupportSystemService(supportSystemRepo),
			commandBusMock,
			queryBusMock,
		);
		const elements = await resolver.getSurveySupportSystems('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(elements).toEqual([domainSupportSystem, domainSupportSystem]);
	});

	test('cloneSupportSystemsFromOVSSurvey', async () => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new SupportSystemResolver(
			new SupportSystemService(supportSystemRepo),
			commandBusMock,
			queryBusMock,
		);
		const result = await resolver.cloneSupportSystemsFromOVSSurvey(
			'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
			'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
		);
		expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
		expect(result).toEqual([supportSystem1, supportSystem2]);
	});
});
