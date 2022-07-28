import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { ManifestationService } from './manifestation.service';
import { ManifestationRepository } from './manifestation.repository';
import { domainManifestation } from './__stubs__';
import { ManifestationFactory } from './manifestation.factory';
import { Manifestation } from './models/manifestation.model';

jest.mock('./manifestation.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

describe('Decomposition / Manifestations / Service', () => {
	test('getManifestations returns array of Manifestation objects', async () => {
		const service = new ManifestationService(new ManifestationRepository(prismaServiceMock));
		const manifestations = await service.getManifestations('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(manifestations).toBeInstanceOf(Array);
		expect(manifestations[0]).toBeInstanceOf(Manifestation);
		expect(manifestations).toEqual(
			[domainManifestation].map((manifestation) => ManifestationFactory.CreateManifestation(manifestation)),
		);
	});
});
