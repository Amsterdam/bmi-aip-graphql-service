import { MockedObjectDeep } from 'ts-jest';

import { LuminaireRepository } from '../luminaire.repository';
import { domainReviseLuminaire, reviseLuminaireInput } from '../__stubs__';

import { CreateMissingLuminaireCommand } from './create-missing-luminaire.command';
import { CreateMissingLuminaireHandler } from './create-missing-luminaire.handler';

const luminaireRepoMock: MockedObjectDeep<LuminaireRepository> = {
	createMissingLuminaire: jest.fn().mockResolvedValue(domainReviseLuminaire),
	...(<any>{}),
};

describe('CreateMissingLuminaireHandler', () => {
	test('executes command', async () => {
		const command = new CreateMissingLuminaireCommand(reviseLuminaireInput);
		const result = await new CreateMissingLuminaireHandler(luminaireRepoMock).execute(command);

		expect(luminaireRepoMock.createMissingLuminaire).toHaveBeenCalledTimes(1);
		expect(luminaireRepoMock.createMissingLuminaire).toHaveBeenCalledWith(reviseLuminaireInput);

		expect(result).toEqual(domainReviseLuminaire);
	});
});
