import { MockedObjectDeep } from 'ts-jest';
import { CommandBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { ElementResolver } from './element.resolver';
import { ElementService } from './element.service';
import { domainElement, elementInput } from './__stubs__';
import { CreateElementCommand } from './commands/create-element.command';
import { Element } from './models/element.model';
import { ElementRepository } from './element.repository';

jest.mock('./element.service');
jest.mock('./element.repository');

const commandBusMock: MockedObjectDeep<CommandBus> = {
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateElementCommand.name:
				return domainElement;
		}
	}),
	...(<any>{}),
};

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

describe('Decomposition / Element / Resolver', () => {
	describe('createElement', () => {
		test('creates and returns an element', async () => {
			const resolver = new ElementResolver(
				new ElementService(new ElementRepository(prismaServiceMock)),
				commandBusMock,
			);
			const result = await resolver.createElement(elementInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateElementCommand(elementInput));

			expect(result).toBeInstanceOf(Element);
			expect(typeof result.id).toBe('string');
		});
	});
});
