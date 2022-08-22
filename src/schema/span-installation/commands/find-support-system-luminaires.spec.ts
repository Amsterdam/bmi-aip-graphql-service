import { MockedObjectDeep } from 'ts-jest';

import { luminaire } from '../__stubs__';
import { LuminaireService } from '../luminaire.service';

import { FindSupportSystemLuminairesHandler } from './find-support-system-luminaires.handler';
import { FindSupportSystemLuminairesCommand } from './find-support-system-luminaires.command';

const luminaireServiceMock: MockedObjectDeep<LuminaireService> = {
	getLuminaires: jest.fn().mockResolvedValue([luminaire]),
	...(<any>{}),
};

describe('FindSupportSystemLuminairesHandler', () => {
	test('executes command', async () => {
		const command = new FindSupportSystemLuminairesCommand('__ID__');
		const result = await new FindSupportSystemLuminairesHandler(luminaireServiceMock).execute(command);

		expect(luminaireServiceMock.getLuminaires).toHaveBeenCalledTimes(1);
		expect(luminaireServiceMock.getLuminaires).toHaveBeenCalledWith('__ID__');

		expect(result).toEqual([luminaire]);
	});
});
