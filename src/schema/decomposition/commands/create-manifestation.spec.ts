import { MockedObjectDeep } from 'ts-jest';

import { ManifestationRepository } from '../manifestation.repository';
import { manifestationInput, domainManifestation } from '../__stubs__';
import { ManifestationFactory } from '../manifestation.factory';

import { CreateManifestationCommand } from './create-manifestation.command';
import { CreateManifestationHandler } from './create-manifestation.handler';

const manifestationRepoMock: MockedObjectDeep<ManifestationRepository> = {
	createManifestation: jest.fn().mockResolvedValue(domainManifestation),
	...(<any>{}),
};

describe('CreateManifestationHandler', () => {
	test('executes command', async () => {
		const command = new CreateManifestationCommand(manifestationInput);
		const result = await new CreateManifestationHandler(manifestationRepoMock).execute(command);

		expect(manifestationRepoMock.createManifestation).toHaveBeenCalledTimes(1);
		expect(manifestationRepoMock.createManifestation).toHaveBeenCalledWith(manifestationInput);

		expect(result).toEqual(ManifestationFactory.CreateManifestation(domainManifestation));
	});
});
