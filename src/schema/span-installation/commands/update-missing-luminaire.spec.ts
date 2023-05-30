import { MockedObjectDeep } from 'ts-jest';

import { LuminaireRepository } from '../luminaire.repository';
import { domainReviseLuminaire, updateMissingLuminaireInput } from '../__stubs__';

import { UpdateMissingLuminaireCommand } from './update-missing-luminaire.command';
import { UpdateMissingLuminaireHandler } from './update-missing-luminaire.handler';

const luminaireRepoMock: MockedObjectDeep<LuminaireRepository> = {
	reviseLuminaire: jest.fn().mockResolvedValue(domainReviseLuminaire),
	...(<any>{}),
};

describe('UpdateMissingLuminaireHandler', () => {
	test('executes command', async () => {
		const command = new UpdateMissingLuminaireCommand(updateMissingLuminaireInput);
		const result = await new UpdateMissingLuminaireHandler(luminaireRepoMock).execute(command);

		expect(luminaireRepoMock.reviseLuminaire).toHaveBeenCalledTimes(1);
		expect(luminaireRepoMock.reviseLuminaire).toHaveBeenCalledWith(updateMissingLuminaireInput);

		expect(result).toEqual(domainReviseLuminaire);
	});
});
