import { MockedObjectDeep } from 'ts-jest';

import { LuminaireRepository } from '../luminaire.repository';
import { domainReviseLuminaire, reviseLuminaireInput } from '../__stubs__';

import { ReviseLuminaireCommand } from './update-missing-luminaire.command';
import { ReviseLuminaireHandler } from './update-missing-luminaire.handler';

const luminaireRepoMock: MockedObjectDeep<LuminaireRepository> = {
	reviseLuminaire: jest.fn().mockResolvedValue(domainReviseLuminaire),
	...(<any>{}),
};

describe('ReviseLuminaireHandler', () => {
	test('executes command', async () => {
		const command = new ReviseLuminaireCommand(reviseLuminaireInput);
		const result = await new ReviseLuminaireHandler(luminaireRepoMock).execute(command);

		expect(luminaireRepoMock.reviseLuminaire).toHaveBeenCalledTimes(1);
		expect(luminaireRepoMock.reviseLuminaire).toHaveBeenCalledWith(reviseLuminaireInput);

		expect(result).toEqual(domainReviseLuminaire);
	});
});
