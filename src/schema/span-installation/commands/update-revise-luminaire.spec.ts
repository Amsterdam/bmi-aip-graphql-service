import { MockedObjectDeep } from 'ts-jest';

import { LuminaireRepository } from '../luminaire.repository';
import { domainReviseLuminaire, updateMissingLuminaireInput } from '../__stubs__';

import { UpdateReviseLuminaireCommand } from './update-revise-luminaire.command';
import { UpdateReviseLuminaireHandler } from './update-revise-luminaire.handler';

const luminaireRepoMock: MockedObjectDeep<LuminaireRepository> = {
	updateReviseLuminaire: jest.fn().mockResolvedValue(domainReviseLuminaire),
	...(<any>{}),
};

describe('UpdateReviseLuminaireHandler', () => {
	test('executes command', async () => {
		const command = new UpdateReviseLuminaireCommand(updateMissingLuminaireInput);
		const result = await new UpdateReviseLuminaireHandler(luminaireRepoMock).execute(command);

		expect(luminaireRepoMock.updateReviseLuminaire).toHaveBeenCalledTimes(1);
		expect(luminaireRepoMock.updateReviseLuminaire).toHaveBeenCalledWith(updateMissingLuminaireInput);

		expect(result).toEqual(domainReviseLuminaire);
	});
});
