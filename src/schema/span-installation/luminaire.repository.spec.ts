import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { LuminaireRepository } from './luminaire.repository';
import { deletedLuminaire, domainLuminaire, luminaire1, luminaireInput, updateLuminaireInput } from './__stubs__';
import type { LuminaireWithoutGeography } from './types/luminaire.repository.interface';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	spanLuminaires: {
		create: jest.fn().mockResolvedValue(domainLuminaire),
		findMany: jest.fn().mockResolvedValue([domainLuminaire]),
		update: jest.fn().mockResolvedValue(domainLuminaire),
	},
	$executeRaw: jest.fn(),
	$queryRaw: jest.fn(),
	...(<any>{}),
};

const repo = new LuminaireRepository(prismaServiceMock);

describe('Span Installation / Luminaire / Repository', () => {
	test('createLuminaire()', async () => {
		const returnValue = await repo.createLuminaire(luminaireInput);
		const luminaire = prismaServiceMock.spanLuminaires.create.mock.calls[0][0].data as LuminaireWithoutGeography;
		expect(luminaire).toEqual(
			expect.objectContaining({
				id: luminaire.id,
				spanSupportSystems: {
					connect: {
						id: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
					},
				},
				name: '__NAME__',
				constructionYear: 1979,
				driverSupplierType: 'one',
				driverCommissioningDate: null,
				lightCommissioningDate: null,
				location: '__LOCATION__',
				lightSupplierType: 'two',
				manufacturer: '__MANUFACTURER__',
				remarks: '__REMARKS__',
				supplierType: 'two',
				hasLED: true,
			}),
		);
		expect(prismaServiceMock.$executeRaw).toHaveBeenCalled();
		expect(returnValue).toEqual(
			expect.objectContaining({
				...luminaireInput,
			}),
		);
	});

	test('getLuminaires()', async () => {
		prismaServiceMock.$queryRaw.mockResolvedValue([
			{
				geography: JSON.stringify({
					type: 'Point',
					coordinates: [33, 22],
				}),
			},
		]);
		const expected = {
			...domainLuminaire,
			geography: {
				type: 'Point',
				coordinates: [33, 22],
			},
		};

		const luminaires = await repo.getLuminaires('__SUPPORTSYSTEM_ID__');
		expect(prismaServiceMock.spanLuminaires.findMany).toHaveBeenCalledWith({
			where: { supportSystemId: '__SUPPORTSYSTEM_ID__', deleted_at: null },
		});
		expect(luminaires).toEqual([expected]);
	});

	test('updateLuminaire()', async () => {
		prismaServiceMock.spanLuminaires.update.mockResolvedValue(domainLuminaire);
		prismaServiceMock.$queryRaw.mockResolvedValue([{ geography: JSON.stringify(luminaire1.geography) }]);
		const spy = jest.spyOn(repo, 'getGeographyAsGeoJSON').mockResolvedValue(updateLuminaireInput.geography);
		const returnValue = await repo.updateLuminaire(updateLuminaireInput);
		expect(prismaServiceMock.$executeRaw).toHaveBeenCalled();
		expect(prismaServiceMock.spanLuminaires.update).toHaveBeenCalledWith({
			where: { id: updateLuminaireInput.id },
			data: {
				name: '__NAME__',
				constructionYear: 1979,
				driverSupplierType: 'one',
				driverCommissioningDate: null,
				lightCommissioningDate: null,
				location: '__LOCATION__',
				lightSupplierType: 'two',
				manufacturer: '__MANUFACTURER__',
				remarks: '__REMARKS__',
				supplierType: 'two',
				hasLED: true,
				geographyRD: {
					coordinates: [116211.88, 487352.77],
					type: 'Point',
				},
			},
		});
		expect(spy).toHaveBeenCalledWith(updateLuminaireInput.id);
		expect(returnValue).toEqual({
			id: '1f728e79-1b89-4333-a309-ea93bf17667c',
			lightCommissioningDate: null,
			deleted_at: null,
			name: '__NAME__',
			constructionYear: 1979,
			driverCommissioningDate: null,
			driverSupplierType: 'one',
			location: '__LOCATION__',
			geography: {
				coordinates: [52.370302853062604, 4.893996915500548],
				type: 'Point',
			},
			geographyRD: {
				coordinates: [116211.88, 487352.77],
				type: 'Point',
			},
			lightSupplierType: 'two',
			manufacturer: '__MANUFACTURER__',
			remarks: '__REMARKS__',
			supplierType: 'two',
			supportSystemId: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
			hasLED: true,
			permanentId: '1f728e79-1b89-4333-a309-ea93bf17667c',
			remarksRevision: null,
		});
	});

	test('deleteLuminaire', async () => {
		prismaServiceMock.spanLuminaires.update.mockResolvedValue(deletedLuminaire);
		prismaServiceMock.$queryRaw.mockResolvedValue([{ geography: JSON.stringify(luminaire1.geography) }]);
		const spy = jest.spyOn(repo, 'getGeographyAsGeoJSON').mockResolvedValue(updateLuminaireInput.geography);
		const identifier = '610d0b4e-c06f-4894-9f60-8e1d0f78d2f1';
		const luminaire = await repo.deleteLuminaire(identifier);
		expect(prismaServiceMock.spanLuminaires.update).toHaveBeenCalledWith({
			where: { id: identifier },
			data: expect.objectContaining({}),
		});
		expect(luminaire.deleted_at instanceof Date).toBe(true);
		expect(luminaire).toEqual(
			expect.objectContaining({
				name: '__NAME__',
				constructionYear: 1979,
				created_at: undefined,
				driverCommissioningDate: null,
				driverSupplierType: 'one',
				geography: {
					coordinates: [52.370302853062604, 4.893996915500548],
					type: 'Point',
				},
				geographyRD: {
					coordinates: [116211.88, 487352.77],
					type: 'Point',
				},
				id: '1f728e79-1b89-4333-a309-ea93bf17667c',
				lightSupplierType: 'two',
				location: '__LOCATION__',
				manufacturer: '__MANUFACTURER__',
				remarks: '__REMARKS__',
				supplierType: 'two',
				supportSystemId: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
				updated_at: undefined,
			}),
		);
		expect(spy).toHaveBeenCalledWith(identifier);
	});

	test('getGeographyAsGeoJSON', async () => {
		prismaServiceMock.$queryRaw.mockResolvedValue([{ geography: JSON.stringify(luminaire1.geography) }]);
		const geography = await repo.getGeographyAsGeoJSON(domainLuminaire.id);
		expect(geography).toEqual(luminaire1.geography);
	});
});
