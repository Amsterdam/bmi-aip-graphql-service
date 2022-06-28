import { MockedObjectDeep } from 'ts-jest';

import { ManifestationRepository } from '../manifestation.repository';
import { domainManifestation } from '../__stubs__';

import { DeleteManifestationCommand } from './delete-manifestation.command';
import { DeleteManifestationHandler } from './delete-manifestation.handler';

const manifestationRepoMock: MockedObjectDeep<ManifestationRepository> = {
	deleteManifestation: jest.fn().mockResolvedValue(domainManifestation),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('DeleteManifestationHandler', () => {
	test('executes command', async () => {
		const command = new DeleteManifestationCommand(identifier);
		const result = await new DeleteManifestationHandler(manifestationRepoMock).execute(command);

		expect(manifestationRepoMock.deleteManifestation).toHaveBeenCalledTimes(1);
		expect(manifestationRepoMock.deleteManifestation).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(domainManifestation);
	});
});
