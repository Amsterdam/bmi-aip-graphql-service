import { MockedObjectDeep } from 'ts-jest';
import { Decimal } from '@prisma/client/runtime';

import { PrismaService } from '../../prisma.service';
import { SupportSystemType } from '../../types';

import { SupportSystemRepository } from './support-system.repository';
import {
	deletedSupportSystem,
	domainSupportSystem,
	supportSystem1,
	supportSystemInput,
	updateSupportSystemInput,
} from './__stubs__';
import type { SupportSystemWithoutGeography } from './types/support-system.repository.interface';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	spanSupportSystemes: {
		create: jest.fn().mockResolvedValue(domainSupportSystem),
		findMany: jest.fn().mockResolvedValue([domainSupportSystem]),
		update: jest.fn().mockResolvedValue(domainSupportSystem),
	},
	$executeRaw: jest.fn(),
	$queryRaw: jest.fn(),
	...(<any>{}),
};

const repo = new SupportSystemRepository(prismaServiceMock);

describe('Span Installation / SupportSystem / Repository', () => {
	test('createSupportSystem()', async () => {
		const returnValue = await repo.createSupportSystem(supportSystemInput);
		const supportSystem = prismaServiceMock.spanSupportSystems.create.mock.calls[0][0]
			.data as SupportSystemWithoutGeography;
		expect(supportSystem).toEqual(
			expect.objectContaining({
				id: supportSystem.id,
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
				a11yDetails: '__A11Y_DETAILS__',
				installationHeight: 100,
				location: '__LOCATION__',
				locationIndication: '__LOCATION_INDICATION__',
				name: '__NAME__',
				remarks: '__REMARKS__',
				riserTubeVisible: true,
			}),
		);
		expect(prismaServiceMock.$executeRaw).toHaveBeenCalled();
		expect(returnValue).toEqual(
			expect.objectContaining({
				...supportSystemInput,
			}),
		);
	});

	test('getSupportSystems()', async () => {
		const supportSystems = await repo.getSupportSystems('__SURVEY_ID__');
		expect(prismaServiceMock.spanSupportSystems.findMany).toHaveBeenCalledWith({
			where: { surveyId: '__SURVEY_ID__' },
		});
		expect(supportSystems).toEqual([domainSupportSystem]);
	});

	test('updateSupportSystem()', async () => {
		prismaServiceMock.spanSupportSystems.update.mockResolvedValue(domainSupportSystem);
		prismaServiceMock.$queryRaw.mockResolvedValue([{ geography: JSON.stringify(supportSystem1.geography) }]);
		const spy = jest.spyOn(repo, 'getGeographyAsGeoJSON').mockResolvedValue(updateSupportSystemInput.geography);
		const returnValue = await repo.updateSupportSystem(updateSupportSystemInput);
		expect(prismaServiceMock.$executeRaw).toHaveBeenCalled();
		expect(prismaServiceMock.spanSupportSystems.update).toHaveBeenCalledWith({
			where: { id: updateSupportSystemInput.id },
			data: {
				a11yDetails: '__A11Y_DETAILS__',
				installationHeight: 100,
				location: '__LOCATION__',
				locationIndication: '__LOCATION_INDICATION__',
				mastNumber: new Decimal('33.33'),
				name: '__NAME__',
				remarks: '__REMARKS__',
				riserTubeVisible: true,
			},
		});
		expect(spy).toHaveBeenCalledWith(updateSupportSystemInput.id);
		expect(returnValue).toEqual({
			deleted_at: null,
			objectId: 'cecc214d-1c44-4bcd-94e2-f2d661327db3',
			surveyId: '388ecaaa-c6c2-4613-aa14-f206cf577ca7',
			name: '__NAME__',
			type: SupportSystemType.facade,
			location: '__LOCATION__',
			constructionYear: 1979,
			locationIndication: '__LOCATION__INDICATION__',
			a11yDetails: '__A11Y_DETAILS__',
			installationHeight: 100,
			remarks: '__REMARKS__',
			houseNumber: '',
			geography: {
				coordinates: [52.370302853062604, 4.893996915500548],
				type: 'Point',
			},
		});
	});

	test('deleteSupportSystem', async () => {
		prismaServiceMock.spanSupportSystems.update.mockResolvedValue(deletedSupportSystem);
		prismaServiceMock.$queryRaw.mockResolvedValue([{ geography: JSON.stringify(supportSystem1.geography) }]);
		const spy = jest.spyOn(repo, 'getGeographyAsGeoJSON').mockResolvedValue(updateSupportSystemInput.geography);
		const identifier = '610d0b4e-c06f-4894-9f60-8e1d0f78d2f1';
		const supportSystem = await repo.deleteSupportSystem(identifier);
		expect(prismaServiceMock.spanSupportSystems.update).toHaveBeenCalledWith({
			where: { id: identifier },
			data: expect.objectContaining({}),
		});
		expect(supportSystem.deleted_at instanceof Date).toBe(true);
		expect(supportSystem).toEqual(
			expect.objectContaining({
				objectId: 'cecc214d-1c44-4bcd-94e2-f2d661327db3',
				surveyId: '388ecaaa-c6c2-4613-aa14-f206cf577ca7',
				name: '__NAME__',
				type: SupportSystemType.facade,
				location: '__LOCATION__',
				constructionYear: 1979,
				locationIndication: '__LOCATION__INDICATION__',
				a11yDetails: '__A11Y_DETAILS__',
				installationHeight: 100,
				remarks: '__REMARKS__',
				houseNumber: '',
				geography: {
					coordinates: [52.370302853062604, 4.893996915500548],
					type: 'Point',
				},
			}),
		);
		expect(spy).toHaveBeenCalledWith(identifier);
	});

	test('getGeographyAsGeoJSON', async () => {
		prismaServiceMock.$queryRaw.mockResolvedValue([{ geography: JSON.stringify(supportSystem1.geography) }]);
		const geography = await repo.getGeographyAsGeoJSON(domainSupportSystem.id);
		expect(geography).toEqual(supportSystem1.geography);
	});
});
