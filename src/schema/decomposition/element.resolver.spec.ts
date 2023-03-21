import { MockedObjectDeep } from 'ts-jest';
import { CommandBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { ElementResolver } from './element.resolver';
import { ElementService } from './element.service';
import { ElementRepository } from './element.repository';
import { domainElement, element1, element2, elementInput, updateElementInput, deletedElement } from './__stubs__';
import { CreateElementCommand } from './commands/create-element.command';
import { Element } from './models/element.model';
import { UpdateElementCommand } from './commands/update-element.command';
import { DeleteElementCommand } from './commands/delete-element.command';
import { ElementFactory } from './element.factory';
import { FindSurveyElementsCommand } from './commands/find-survey-elements.command';

jest.mock('./element.service');
jest.mock('./element.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateElementCommand.name:
			case UpdateElementCommand.name:
				return ElementFactory.CreateElement(domainElement);
			case DeleteElementCommand.name:
				return ElementFactory.CreateElement(deletedElement);
			case FindSurveyElementsCommand.name:
				return [element1, element2];
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const elementRepo = new ElementRepository(prismaServiceMock);

describe('Decomposition / Element / Resolver', () => {
	describe('createElement', () => {
		test('creates and returns an element', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new ElementResolver(new ElementService(elementRepo), commandBusMock);
			const result = await resolver.createElement(elementInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateElementCommand(elementInput));

			expect(result).toBeInstanceOf(Element);
			expect(typeof result.id).toBe('string');
		});
	});

	describe('updateElement', () => {
		test('updates and returns an element', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new ElementResolver(new ElementService(elementRepo), commandBusMock);
			const result = await resolver.updateElement(updateElementInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new UpdateElementCommand(updateElementInput));

			expect(result).toBeInstanceOf(Element);
			expect(result.id).toBe(updateElementInput.id);
		});
	});

	describe('deleteElement', () => {
		test('soft-deletes and returns an element', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new ElementResolver(new ElementService(elementRepo), commandBusMock);
			const result = await resolver.deleteElement(domainElement.id);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new DeleteElementCommand(domainElement.id));

			expect(result).toBeInstanceOf(Element);
			expect(result.id).toBe(domainElement.id);
			expect(result.deletedAt).toBe('Thu, 09 Jun 2022 15:03:22 GMT');
		});
	});

	test('getSurveyElements returns an array of element objects', async () => {
		const commandBusMock = getCommandBusMock();
		const resolver = new ElementResolver(new ElementService(elementRepo), commandBusMock);
		const elements = await resolver.findSurveyElements('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(elements).toEqual([element1, element2]);
	});
});
