import { MockedObjectDeep } from 'ts-jest';

import { LuminaireRepository } from '../luminaire.repository';
import { domainLuminaire, updateLuminaireInput } from '../__stubs__';

import { UpdateLuminaireCommand } from './update-luminaire.command';
import { UpdateLuminaireHandler } from './update-luminaire.handler';

const luminaireRepoMock: MockedObjectDeep<LuminaireRepository> = {
	updateLuminaire: jest.fn().mockResolvedValue(domainLuminaire),
	...(<any>{}),
};

describe('UpdateLuminaireHandler', () => {
	test('executes command', async () => {
		const command = new UpdateLuminaireCommand(updateLuminaireInput);
		const result = await new UpdateLuminaireHandler(luminaireRepoMock).execute(command);

		expect(luminaireRepoMock.updateLuminaire).toHaveBeenCalledTimes(1);
		expect(luminaireRepoMock.updateLuminaire).toHaveBeenCalledWith(updateLuminaireInput);

		expect(result).toEqual(domainLuminaire);
	});
});
