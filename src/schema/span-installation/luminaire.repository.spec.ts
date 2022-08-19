import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { LuminaireRepository } from './luminaire.repository';
import { deletedLuminaire, domainLuminaire, luminaire1, luminaireInput, updateLuminaireInput } from './__stubs__';
import type { LuminaireWithoutGeography } from './types/luminaire.repository.interface';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	spanLuminairees: {
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
				supportSystems: {
					connect: {
						id: '68a95a2c-b909-e77f-4d66-9fd5afef5afb',
					},
				},
				name: '__NAME__',
				constructionYear: 1979,
				driverCommissioningDate: null,
				driverSupplierType: 'one',
				geography: {
					coordinates: [52.37593907780107, 4.894690444015065],
					type: 'Point',
				},
				lightCommissioningDate: '',
				lightSupplierType: 'two',
				location: null,
				manufacturer: '__MANUFACTURER__',
				remarks: '__REMARKS__',
				supplierType: 'two',
				supportSystemId: 'cecc214d-1c44-4bcd-94e2-f2d661327db3',
				updatedAt: '2022-08-02T15:52:54.044Z',
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
		const luminaires = await repo.getLuminaires('__SURVEY_ID__');
		expect(prismaServiceMock.spanLuminaires.findMany).toHaveBeenCalledWith({
			where: { surveyId: '__SURVEY_ID__' },
		});
		expect(luminaires).toEqual([domainLuminaire]);
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
				driverCommissioningDate: null,
				driverSupplierType: 'one',
				geography: {
					coordinates: [52.37593907780107, 4.894690444015065],
					type: 'Point',
				},
				lightCommissioningDate: '',
				lightSupplierType: 'two',
				location: null,
				manufacturer: '__MANUFACTURER__',
				remarks: '__REMARKS__',
				supplierType: 'two',
				supportSystemId: 'cecc214d-1c44-4bcd-94e2-f2d661327db3',
				updatedAt: '2022-08-02T15:52:54.044Z',
			},
		});
		expect(spy).toHaveBeenCalledWith(updateLuminaireInput.id);
		expect(returnValue).toEqual({
			deleted_at: null,
			name: '__NAME__',
			constructionYear: 1979,
			createdAt: '2022-08-02T15:51:54.044Z',
			deletedAt: '2022-08-02T15:53:07.441Z',
			driverCommissioningDate: null,
			driverSupplierType: 'one',
			geography: {
				coordinates: [52.37593907780107, 4.894690444015065],
				type: 'Point',
			},
			id: '71c5450a-c0a3-48ea-adbb-ea435a8804d5',
			lightCommissioningDate: '',
			lightSupplierType: 'two',
			location: null,
			manufacturer: '__MANUFACTURER__',
			remarks: '__REMARKS__',
			supplierType: 'two',
			supportSystemId: 'cecc214d-1c44-4bcd-94e2-f2d661327db3',
			updatedAt: '2022-08-02T15:52:54.044Z',
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
				createdAt: '2022-08-02T15:51:54.044Z',
				deletedAt: '2022-08-02T15:53:07.441Z',
				driverCommissioningDate: null,
				driverSupplierType: 'one',
				geography: {
					coordinates: [52.37593907780107, 4.894690444015065],
					type: 'Point',
				},
				id: '71c5450a-c0a3-48ea-adbb-ea435a8804d5',
				lightCommissioningDate: '',
				lightSupplierType: 'two',
				location: null,
				manufacturer: '__MANUFACTURER__',
				remarks: '__REMARKS__',
				supplierType: 'two',
				supportSystemId: 'cecc214d-1c44-4bcd-94e2-f2d661327db3',
				updatedAt: '2022-08-02T15:52:54.044Z',
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
