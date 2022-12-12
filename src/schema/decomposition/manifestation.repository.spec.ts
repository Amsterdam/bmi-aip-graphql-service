import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { ManifestationRepository } from './manifestation.repository';
import { deletedManifestation, domainManifestation, manifestationInput, updateManifestationInput } from './__stubs__';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	manifestations: {
		create: jest.fn().mockResolvedValue(domainManifestation),
		findMany: jest.fn().mockResolvedValue([domainManifestation]),
		update: jest.fn().mockResolvedValue(domainManifestation),
	},
	...(<any>{}),
};

const repo = new ManifestationRepository(prismaServiceMock);

describe('ManifestationRepository', () => {
	test('create()', async () => {
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

	test('getManifestations()', async () => {
		const manifestations = await repo.getManifestations('__UNIT_ID__');
		expect(prismaServiceMock.manifestations.findMany).toHaveBeenCalledWith({
			where: {
				unitId: '__UNIT_ID__',
				deleted_at: null,
			},
		});
		expect(manifestations).toEqual([domainManifestation]);
	});

	test('updateManifestation()', async () => {
		await repo.updateManifestation(updateManifestationInput);
		expect(prismaServiceMock.manifestations.update).toHaveBeenCalledWith({
			where: { id: updateManifestationInput.id },
			data: expect.objectContaining({
				id: '1f728e79-1b89-4333-a309-ea93bf17667c',
				code: '__CODE__',
				name: '__NAME__',
				location: '__LOCATION__',
				material: undefined,
				quantity: 3,
				quantityUnitOfMeasurement: 'm2',
				constructionYear: undefined,
			}),
		});
	});

	test('deleteManifestation', async () => {
		// @ts-ignore
		prismaServiceMock.manifestations.update.mockResolvedValue(deletedManifestation);
		const identifier = '610d0b4e-c06f-4894-9f60-8e1d0f78d2f1';
		const manifestation = await repo.deleteManifestation(identifier);
		expect(prismaServiceMock.manifestations.update).toHaveBeenCalledWith({
			where: { id: identifier },
			data: expect.objectContaining({}),
		});
		expect(manifestation.deleted_at instanceof Date).toBe(true);
	});

	test('deleteManifestationsForUnit', async () => {
		const identifier = '610d0b4e-c06f-4894-9f60-8e1d0f78d2f1';
		const uuid1 = '0cd685ff-8566-4f62-9757-65a16b483c2e';
		const uuid2 = '1e76227d-cc0c-469f-8359-dee4dc74adba';
		const deleteManifestationSpy = jest.spyOn(repo, 'deleteManifestation');
		// @ts-ignore
		prismaServiceMock.manifestations.findMany.mockResolvedValue([{ id: uuid1 }, { id: uuid2 }]);
		await repo.deleteManifestationsForUnit(identifier);
		expect(prismaServiceMock.manifestations.findMany).toHaveBeenCalledWith({
			where: { unitId: identifier },
			select: { id: true },
		});
		expect(deleteManifestationSpy).toHaveBeenCalledWith(uuid1);
		expect(deleteManifestationSpy).toHaveBeenCalledWith(uuid2);
	});
});
