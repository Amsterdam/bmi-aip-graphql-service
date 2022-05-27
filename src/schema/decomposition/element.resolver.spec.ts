import { MockedObjectDeep } from 'ts-jest';
import { CommandBus } from '@nestjs/cqrs';

import { ElementResolver } from './element.resolver';
import { ElementService } from './element.service';
import { domainElement, element1, element2, elementInput } from './__stubs__';
import { CreateElementCommand } from './commands/create-element.command';
import { Element } from './models/element.model';

jest.mock('./element.service');

const commandBusMock: MockedObjectDeep<CommandBus> = {
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateElementCommand.name:
				return domainElement;
		}
	}),
	...(<any>{}),
};

describe('Decomposition / Element / Resolver', () => {
	describe('createElement', () => {
		test('creates and returns an element', async () => {
			const resolver = new ElementResolver(new ElementService(), commandBusMock);
			const result = await resolver.createElement(elementInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateElementCommand(elementInput));

			expect(result).toBeInstanceOf(Element);
			expect(typeof result.id).toBe('string');
		});
	});

	test('getSurveyElements returns an array of element objects', async () => {
		const resolver = new ElementResolver(new ElementService(), commandBusMock);
		const elements = await resolver.getSurveyElements('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7', '113');
		expect(elements).toEqual([element1, element2]);
	});

	test('getElementById returns an element object', async () => {
		const resolver = new ElementResolver(new ElementService(), commandBusMock);
		expect(await resolver.getElementById(element1.id)).toEqual(element1);
	});
});
