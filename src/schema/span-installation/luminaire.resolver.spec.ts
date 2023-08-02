import { MockedObjectDeep } from 'ts-jest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { LuminaireService } from './luminaire.service';
import { LuminaireRepository } from './luminaire.repository';
import {
	domainLuminaire,
	luminaire1,
	luminaire2,
	luminaireInput,
	updateLuminaireInput,
	deletedLuminaire,
} from './__stubs__';
import { CreateLuminaireCommand } from './commands/create-luminaire.command';
import { Luminaire } from './models/luminaire.model';
import { UpdateLuminaireCommand } from './commands/update-luminaire.command';
import { DeleteLuminaireCommand } from './commands/delete-luminaire.command';
import { LuminaireResolver } from './luminaire.resolver';

jest.mock('./luminaire.service');
jest.mock('./luminaire.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateLuminaireCommand.name:
			case UpdateLuminaireCommand.name:
				return domainLuminaire;
			case DeleteLuminaireCommand.name:
				return deletedLuminaire;
		}
	}),
	...(<any>{}),
});

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const junctionBoxRepo = new LuminaireRepository(prismaServiceMock);

describe('Span Installation / Luminaire / Resolver', () => {
	describe('createLuminaire', () => {
		test('creates and returns an element', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new LuminaireResolver(new LuminaireService(junctionBoxRepo), commandBusMock, queryBusMock);
			const result = await resolver.createLuminaire(luminaireInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateLuminaireCommand(luminaireInput));

			expect(result).toBeInstanceOf(Luminaire);
			expect(typeof result.id).toBe('string');
		});
	});

	describe('updateLuminaire', () => {
		test('updates and returns a junction box', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new LuminaireResolver(new LuminaireService(junctionBoxRepo), commandBusMock, queryBusMock);
			const result = await resolver.updateLuminaire(updateLuminaireInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new UpdateLuminaireCommand(updateLuminaireInput));

			expect(result).toBeInstanceOf(Luminaire);
			expect(result.id).toBe(updateLuminaireInput.id);
		});
	});

	describe('deleteLuminaire', () => {
		test('soft-deletes and returns a junction box', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new LuminaireResolver(new LuminaireService(junctionBoxRepo), commandBusMock, queryBusMock);
			const result = await resolver.deleteLuminaire(domainLuminaire.id);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new DeleteLuminaireCommand(domainLuminaire.id));

			expect(result).toBeInstanceOf(Luminaire);
			expect(result.id).toBe(domainLuminaire.id);
			expect(result.deletedAt).toBe('Thu, 09 Jun 2022 15:03:22 GMT');
		});
	});

	test('getsupportSystemLuminaires returns an array of luminaire objects', async () => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new LuminaireResolver(new LuminaireService(junctionBoxRepo), commandBusMock, queryBusMock);
		const elements = await resolver.getsupportSystemLuminaires('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(elements).toEqual([luminaire1, luminaire2]);
	});
});
