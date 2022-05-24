import { MockedObjectDeep } from 'ts-jest';
import { CommandBus } from '@nestjs/cqrs';

import { ManifestationResolver } from './manifestation.resolver';
import { ManifestationService } from './manifestation.service';
import { manifestationInput, domainManifestation } from './__stubs__/manifestation';
import { CreateManifestationCommand } from './commands/create-manifestation.command';
import { Manifestation } from './models/graphql/manifestation.model';

jest.mock('./manifestation.service');

const commandBusMock: MockedObjectDeep<CommandBus> = {
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateManifestationCommand.name:
				return domainManifestation;
		}
	}),
	...(<any>{}),
};

describe('Decomposition / Manifestation / Resolver', () => {
	describe('createManifestation', () => {
		test('creates and returns a manifestation', async () => {
			const resolver = new ManifestationResolver(new ManifestationService(), commandBusMock);
			const result = await resolver.createManifestation(manifestationInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateManifestationCommand(manifestationInput));

			expect(result).toBeInstanceOf(Manifestation);
			expect(typeof result.id).toBe('string');
		});
	});
});
