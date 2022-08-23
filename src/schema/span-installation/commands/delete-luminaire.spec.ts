import { MockedObjectDeep } from 'ts-jest';

import { LuminaireRepository } from '../luminaire.repository';
import { domainLuminaire } from '../__stubs__';

import { DeleteLuminaireCommand } from './delete-luminaire.command';
import { DeleteLuminaireHandler } from './delete-luminaire.handler';

const luminaireRepoMock: MockedObjectDeep<LuminaireRepository> = {
	deleteLuminaire: jest.fn().mockResolvedValue(domainLuminaire),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('DeleteLuminaireHandler', () => {
	test('executes command', async () => {
		const command = new DeleteLuminaireCommand(identifier);
		const result = await new DeleteLuminaireHandler(luminaireRepoMock).execute(command);

		expect(luminaireRepoMock.deleteLuminaire).toHaveBeenCalledTimes(1);
		expect(luminaireRepoMock.deleteLuminaire).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(domainLuminaire);
	});
});
