import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { UnitRepository } from './unit.repository';
import { domainUnit, unitInput, updateUnitInput, deletedUnit } from './__stubs__';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	units: {
		create: jest.fn().mockResolvedValue(domainUnit),
		findMany: jest.fn().mockResolvedValue([domainUnit]),
		update: jest.fn().mockResolvedValue(domainUnit),
	},
	manifestations: {
		count: jest.fn(),
	},
	...(<any>{}),
};

// jest.mock('./manifestation.repository');

const repo = new UnitRepository(prismaServiceMock);

describe('UnitRepository', () => {
	test('create()', async () => {
		await repo.createUnit(unitInput);
		expect(prismaServiceMock.units.create).toHaveBeenCalledWith({
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
				code: '__CODE__',
				name: '__NAME__',
				location: '__LOCATION__',
				material: '__MATERIAL__',
				quantity: 3,
				quantityUnitOfMeasurement: 'm2',
				isRelevant: true,
				constructionYear: 2010,
				isStructural: true,
				isElectrical: false,
				isStructuralObjectSpecific: false,
				isElectricalObjectSpecific: false,
			}),
		});
	});

	test('getUnits()', async () => {
		const units = await repo.getUnits('__ELEMENT_ID__');
		expect(prismaServiceMock.units.findMany).toHaveBeenCalledWith({
			where: {
				elementId: '__ELEMENT_ID__',
				deleted_at: null,
			},
		});
		expect(units).toEqual([domainUnit]);
	});

	test('updateUnit()', async () => {
		await repo.updateUnit(updateUnitInput);
		expect(prismaServiceMock.units.update).toHaveBeenCalledWith({
			where: { id: updateUnitInput.id },
			data: expect.objectContaining({
				code: '__CODE__',
				name: '__NAME__',
				location: '__LOCATION__',
				quantity: 3,
				quantityUnitOfMeasurement: 'm2',
				constructionYear: 2010,
				material: '__MATERIAL__',
				isRelevant: true,
				isStructural: true,
				isElectrical: false,
				isStructuralObjectSpecific: false,
				isElectricalObjectSpecific: false,
			}),
		});
	});

	test('deleteUnit', async () => {
		// @ts-ignore
		prismaServiceMock.units.update.mockResolvedValue(deletedUnit);
		const identifier = '610d0b4e-c06f-4894-9f60-8e1d0f78d2f1';
		const unit = await repo.deleteUnit(identifier);
		expect(prismaServiceMock.units.update).toHaveBeenCalledWith({
			where: { id: identifier },
			data: expect.objectContaining({}),
		});
		expect(unit.deleted_at instanceof Date).toBe(true);
	});

	describe('hasManifestations', () => {
		test('true', async () => {
			prismaServiceMock.manifestations.count.mockResolvedValue(2);
			expect(await repo.hasManifestations('610d0b4e-c06f-4894-9f60-8e1d0f78d2f1')).toBe(true);
		});

		test('false', async () => {
			prismaServiceMock.manifestations.count.mockResolvedValue(0);
			expect(await repo.hasManifestations('610d0b4e-c06f-4894-9f60-8e1d0f78d2f1')).toBe(false);
		});
	});
});
