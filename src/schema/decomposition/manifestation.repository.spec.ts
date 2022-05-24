import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { ManifestationRepository } from './manifestation.repository';
import { domainManifestation, manifestationInput } from './__stubs__/manifestation';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	manifestations: {
		create: jest.fn().mockResolvedValue(domainManifestation),
	},
	...(<any>{}),
};

describe('ManifestationRepository', () => {
	test('create()', async () => {
		const repo = new ManifestationRepository(prismaServiceMock);
		await repo.createManifestation(manifestationInput);
		expect(prismaServiceMock.manifestations.create).toHaveBeenCalledWith({
			data: expect.objectContaining({
				objects: {
					connect: {
						id: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
					},
				},
				surveys: {
					connect: {
						id: '68a95a2c-b909-e77f-4d66-9fd5afef5afb',
					},
				},
				elements: {
					connect: {
						id: 'a13d3055-9447-6178-91d7-386ebbc418f4',
					},
				},
				units: {
					connect: {
						id: '6f1819aa-f5bd-cae5-3ab4-b3bab40f5de2',
					},
				},
				code: '__CODE__',
				name: '__NAME__',
				location: '__LOCATION__',
				quantity: 3,
				quantityUnitOfMeasurement: 'm2',
			}),
		});
	});
});
