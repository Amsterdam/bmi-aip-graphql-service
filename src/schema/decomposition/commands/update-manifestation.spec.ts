import { MockedObjectDeep } from 'ts-jest';

import { ManifestationRepository } from '../manifestation.repository';
import { domainManifestation, updateManifestationInput } from '../__stubs__';

import { UpdateManifestationCommand } from './update-manifestation.command';
import { UpdateManifestationHandler } from './update-manifestation.handler';

const manifestationRepoMock: MockedObjectDeep<ManifestationRepository> = {
	updateManifestation: jest.fn().mockResolvedValue(domainManifestation),
	...(<any>{}),
};

describe('UpdateManifestationHandler', () => {
	test('executes command', async () => {
		const command = new UpdateManifestationCommand(updateManifestationInput);
		const result = await new UpdateManifestationHandler(manifestationRepoMock).execute(command);

		expect(manifestationRepoMock.updateManifestation).toHaveBeenCalledTimes(1);
		expect(manifestationRepoMock.updateManifestation).toHaveBeenCalledWith(updateManifestationInput);

		expect(result).toEqual(domainManifestation);
	});
});
