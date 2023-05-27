import { MockedObjectDeep } from 'ts-jest';

import { LuminaireRepository } from '../luminaire.repository';
import { domainReviseLuminaire, reviseLuminaireInput } from '../__stubs__';

import { CreateReviseLuminaireCommand } from './create-revise-luminaire.command';
import { CreateReviseLuminaireHandler } from './create-revise-luminaire.handler';

const luminaireRepoMock: MockedObjectDeep<LuminaireRepository> = {
	createReviseLuminaire: jest.fn().mockResolvedValue(domainReviseLuminaire),
	...(<any>{}),
};

describe('CreateReviseLuminaireHandler', () => {
	test('executes command', async () => {
		const command = new CreateReviseLuminaireCommand(reviseLuminaireInput);
		const result = await new CreateReviseLuminaireHandler(luminaireRepoMock).execute(command);

		expect(luminaireRepoMock.createReviseLuminaire).toHaveBeenCalledTimes(1);
		expect(luminaireRepoMock.createReviseLuminaire).toHaveBeenCalledWith(reviseLuminaireInput);

		expect(result).toEqual(domainReviseLuminaire);
	});
});
