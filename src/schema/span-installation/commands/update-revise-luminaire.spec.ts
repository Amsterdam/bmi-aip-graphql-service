import { MockedObjectDeep } from 'ts-jest';

import { LuminaireRepository } from '../luminaire.repository';
import { domainReviseLuminaire, updateReviseLuminaireInput } from '../__stubs__';

import { UpdateReviseLuminaireCommand } from './update-revise-luminaire.command';
import { UpdateReviseLuminaireHandler } from './update-revise-luminaire.handler';

const luminaireRepoMock: MockedObjectDeep<LuminaireRepository> = {
	updateReviseLuminaire: jest.fn().mockResolvedValue(domainReviseLuminaire),
	...(<any>{}),
};

describe('UpdateLuminaireHandler', () => {
	test('executes command', async () => {
		const command = new UpdateReviseLuminaireCommand(updateReviseLuminaireInput);
		const result = await new UpdateReviseLuminaireHandler(luminaireRepoMock).execute(command);

		expect(luminaireRepoMock.updateReviseLuminaire).toHaveBeenCalledTimes(1);
		expect(luminaireRepoMock.updateReviseLuminaire).toHaveBeenCalledWith(updateReviseLuminaireInput);

		expect(result).toEqual(domainReviseLuminaire);
	});
});
