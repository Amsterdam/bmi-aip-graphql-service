import { MockedObjectDeep } from 'ts-jest';
import { CommandBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { JunctionBoxResolver } from './junction-box-resolver';
import { JunctionBoxService } from './junction-box.service';
import { JunctionBoxRepository } from './junction-box.repository';
import {
	domainJunctionBox,
	junctionBox1,
	junctionBox2,
	junctionBoxInput,
	updateJunctionBoxInput,
	deletedJunctionBox,
} from './__stubs__';
import { CreateJunctionBoxCommand } from './commands/create-junction-box.command';
import { JunctionBox } from './models/junction-box.model';
import { UpdateJunctionBoxCommand } from './commands/update-junction-box.command';
import { DeleteJunctionBoxCommand } from './commands/delete-junction-box.command';

jest.mock('./junction-box.service');
jest.mock('./junction-box.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateJunctionBoxCommand.name:
			case UpdateJunctionBoxCommand.name:
				return domainJunctionBox;
			case DeleteJunctionBoxCommand.name:
				return deletedJunctionBox;
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const junctionBoxRepo = new JunctionBoxRepository(prismaServiceMock);

describe('Span Installation / JunctionBox / Resolver', () => {
	describe('createJunctionBox', () => {
		test('creates and returns an element', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new JunctionBoxResolver(new JunctionBoxService(junctionBoxRepo), commandBusMock);
			const result = await resolver.createJunctionBox(junctionBoxInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateJunctionBoxCommand(junctionBoxInput));

			expect(result).toBeInstanceOf(JunctionBox);
			expect(typeof result.id).toBe('string');
		});
	});

	describe('updateJunctionBox', () => {
		test('updates and returns a junction box', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new JunctionBoxResolver(new JunctionBoxService(junctionBoxRepo), commandBusMock);
			const result = await resolver.updateJunctionBox(updateJunctionBoxInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new UpdateJunctionBoxCommand(updateJunctionBoxInput));

			expect(result).toBeInstanceOf(JunctionBox);
			expect(result.id).toBe(updateJunctionBoxInput.id);
		});
	});

	describe('deleteJunctionBox', () => {
		test('soft-deletes and returns a junction box', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new JunctionBoxResolver(new JunctionBoxService(junctionBoxRepo), commandBusMock);
			const result = await resolver.deleteJunctionBox(domainJunctionBox.id);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new DeleteJunctionBoxCommand(domainJunctionBox.id));

			expect(result).toBeInstanceOf(JunctionBox);
			expect(result.id).toBe(domainJunctionBox.id);
			expect(result.deletedAt).toBe('Thu, 09 Jun 2022 15:03:22 GMT');
		});
	});

	test('getSurveyJunctionBoxes returns an array of junction box objects', async () => {
		const commandBusMock = getCommandBusMock();
		const resolver = new JunctionBoxResolver(new JunctionBoxService(junctionBoxRepo), commandBusMock);
		const elements = await resolver.getSurveyJunctionBoxes('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(elements).toEqual([junctionBox1, junctionBox2]);
	});
});
