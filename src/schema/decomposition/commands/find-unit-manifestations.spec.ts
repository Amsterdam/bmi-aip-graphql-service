import { MockedObjectDeep } from 'ts-jest';

import { manifestation } from '../__stubs__';
import { ManifestationService } from '../manifestation.service';

import { FindUnitManifestationsHandler } from './find-unit-manifestations.handler';
import { FindUnitManifestationsCommand } from './find-unit-manifestations.command';

const manifestationServiceMock: MockedObjectDeep<ManifestationService> = {
	getManifestations: jest.fn().mockResolvedValue([manifestation]),
	...(<any>{}),
};

describe('FindUnitManifestationsHandler', () => {
	test('executes command', async () => {
		const command = new FindUnitManifestationsCommand('__UNIT_ID__');
		const result = await new FindUnitManifestationsHandler(manifestationServiceMock).execute(command);

		expect(manifestationServiceMock.getManifestations).toHaveBeenCalledTimes(1);
		expect(manifestationServiceMock.getManifestations).toHaveBeenCalledWith('__UNIT_ID__');

		expect(result).toEqual([manifestation]);
	});
});
