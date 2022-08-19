import { MockedObjectDeep } from 'ts-jest';

import { LuminaireRepository } from '../luminaire.repository';
import { luminaireInput, domainLuminaire } from '../__stubs__';

import { CreateLuminaireCommand } from './create-luminaire.command';
import { CreateLuminaireHandler } from './create-luminaire.handler';

const luminaireRepoMock: MockedObjectDeep<LuminaireRepository> = {
	createLuminaire: jest.fn().mockResolvedValue(domainLuminaire),
	...(<any>{}),
};

describe('CreateLuminaireHandler', () => {
	test('executes command', async () => {
		const command = new CreateLuminaireCommand(luminaireInput);
		const result = await new CreateLuminaireHandler(luminaireRepoMock).execute(command);

		expect(luminaireRepoMock.createLuminaire).toHaveBeenCalledTimes(1);
		expect(luminaireRepoMock.createLuminaire).toHaveBeenCalledWith(luminaireInput);

		expect(result).toEqual(domainLuminaire);
	});
});
