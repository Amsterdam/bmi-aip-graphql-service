import { MockedObjectDeep } from 'ts-jest';
import { CommandBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { FailureModeResolver } from './failure-mode.resolver';
import { FailureModeService } from './failure-mode.service';
import { FailureModeRepository } from './failure-mode.repository';
import {
	domainFailureMode,
	failureMode1,
	failureMode2,
	failureModeInput,
	updateFailureModeInput,
	deletedFailureMode,
} from './__stubs__';
import { CreateFailureModeCommand } from './commands/create-failure-mode.command';
import { FailureMode } from './models/failure-mode.model';
import { UpdateFailureModeCommand } from './commands/update-failure-mode.command';
import { DeleteFailureModeCommand } from './commands/delete-failure-mode.command';

jest.mock('./failure-mode.service');
jest.mock('./failure-mode.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateFailureModeCommand.name:
			case UpdateFailureModeCommand.name:
				return domainFailureMode;
			case DeleteFailureModeCommand.name:
				return deletedFailureMode;
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const failureModeRepo = new FailureModeRepository(prismaServiceMock);

describe('Decomposition / FailureMode / Resolver', () => {
	describe('createFailureMode', () => {
		test('creates and returns an failureMode', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new FailureModeResolver(new FailureModeService(failureModeRepo), commandBusMock);
			const result = await resolver.createFailureMode(failureModeInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateFailureModeCommand(failureModeInput));

			expect(result).toBeInstanceOf(FailureMode);
			expect(typeof result.id).toBe('string');
		});
	});

	describe('updateFailureMode', () => {
		test('updates and returns an failureMode', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new FailureModeResolver(new FailureModeService(failureModeRepo), commandBusMock);
			const result = await resolver.updateFailureMode(updateFailureModeInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new UpdateFailureModeCommand(updateFailureModeInput));

			expect(result).toBeInstanceOf(FailureMode);
			expect(result.id).toBe(updateFailureModeInput.id);
		});
	});

	describe('deleteFailureMode', () => {
		test('soft-deletes and returns an failureMode', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new FailureModeResolver(new FailureModeService(failureModeRepo), commandBusMock);
			const result = await resolver.deleteFailureMode(domainFailureMode.id);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new DeleteFailureModeCommand(domainFailureMode.id));

			expect(result).toBeInstanceOf(FailureMode);
			expect(result.id).toBe(domainFailureMode.id);
			expect(result.deletedAt).toBe('Thu, 09 Jun 2022 15:03:22 GMT');
		});
	});

	test('getSurveyFailureModes returns an array of failureMode objects', async () => {
		const commandBusMock = getCommandBusMock();
		const resolver = new FailureModeResolver(new FailureModeService(failureModeRepo), commandBusMock);
		const failureModes = await resolver.getSurveyFailureModes('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(failureModes).toEqual([failureMode1, failureMode2]);
	});
});
