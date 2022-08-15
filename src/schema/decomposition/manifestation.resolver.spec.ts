import { MockedObjectDeep } from 'ts-jest';
import { CommandBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { ManifestationResolver } from './manifestation.resolver';
import { ManifestationService } from './manifestation.service';
import { manifestationInput, domainManifestation, deletedManifestation, updateManifestationInput } from './__stubs__';
import { CreateManifestationCommand } from './commands/create-manifestation.command';
import { Manifestation } from './models/manifestation.model';
import { UpdateManifestationCommand } from './commands/update-manifestation.command';
import { DeleteManifestationCommand } from './commands/delete-manifestation.command';
import { ManifestationRepository } from './manifestation.repository';

jest.mock('./manifestation.service');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateManifestationCommand.name:
			case UpdateManifestationCommand.name:
				return domainManifestation;
			case DeleteManifestationCommand.name:
				return deletedManifestation;
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

describe('Decomposition / Manifestation / Resolver', () => {
	describe('createManifestation', () => {
		test('creates and returns a manifestation', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new ManifestationResolver(
				new ManifestationService(new ManifestationRepository(prismaServiceMock)),
				commandBusMock,
			);
			const result = await resolver.createManifestation(manifestationInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateManifestationCommand(manifestationInput));

			expect(result).toBeInstanceOf(Manifestation);
			expect(typeof result.id).toBe('string');
		});
	});

	describe('updateManifestation', () => {
		test('updates and returns a manifestation', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new ManifestationResolver(
				new ManifestationService(new ManifestationRepository(prismaServiceMock)),
				commandBusMock,
			);
			const result = await resolver.updateManifestation(updateManifestationInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(
				new UpdateManifestationCommand(updateManifestationInput),
			);

			expect(result).toBeInstanceOf(Manifestation);
			expect(result.id).toBe(updateManifestationInput.id);
		});
	});

	describe('deleteManifestation', () => {
		test('soft-deletes and returns a manifestation', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new ManifestationResolver(
				new ManifestationService(new ManifestationRepository(prismaServiceMock)),
				commandBusMock,
			);
			const result = await resolver.deleteManifestation(domainManifestation.id);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new DeleteManifestationCommand(domainManifestation.id));

			expect(result).toBeInstanceOf(Manifestation);
			expect(result.id).toBe(domainManifestation.id);
			expect(result.deletedAt).toBe('Thu, 09 Jun 2022 15:03:22 GMT');
		});
	});
});
