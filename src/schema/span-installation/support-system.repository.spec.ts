import { MockedObjectDeep } from 'ts-jest';
import { Decimal } from '@prisma/client/runtime';

import { PrismaService } from '../../prisma.service';

import { SupportSystemRepository } from './support-system.repository';
import {
	deletedSupportSystem,
	domainSupportSystem,
	supportSystem1,
	updateSupportSystemInput,
	createSupportSystemNormalizedInput,
	updateSupportSystemNormalizedInput,
	luminaire1,
	domainLuminaire,
} from './__stubs__';
import type { SupportSystemWithoutGeography } from './types/support-system.repository.interface';
import { SupportSystemType, SupportSystemTypeDetailedFacade } from './types';

jest.mock('./luminaire.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	spanSupportSystems: {
		create: jest.fn().mockResolvedValue(domainSupportSystem),
		findMany: jest.fn().mockResolvedValue([domainSupportSystem]),
		update: jest.fn().mockResolvedValue(domainSupportSystem),
	},
	$executeRaw: jest.fn(),
	$queryRaw: jest.fn(),
	...(<any>{}),
	spanLuminaires: {
		create: jest.fn().mockResolvedValue(domainLuminaire),
		findMany: jest.fn().mockResolvedValue([domainLuminaire]),
	},
};

let repository: SupportSystemRepository;
let luminaireRepositoryMock;
const LuminaireRepositoryJest = jest.fn(() => ({
	deleteLuminairesForSupportSystem: jest.fn(),
}));

describe('Span Installation / SupportSystem / Repository', () => {
	beforeEach(() => {
		luminaireRepositoryMock = new LuminaireRepositoryJest();
		repository = new SupportSystemRepository(prismaServiceMock, luminaireRepositoryMock);
	});

	test('createSupportSystem()', async () => {
		const returnValue = await repository.createSupportSystem(createSupportSystemNormalizedInput);
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
						id: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
					},
				},
				a11yDetails: createSupportSystemNormalizedInput.a11yDetails,
				installationHeight: new Decimal(10),
				installationLength: new Decimal(10),
				location: '__LOCATION__',
				locationIndication: '__LOCATION_INDICATION__',
				name: '__NAME__',
				remarks: '__REMARKS__',
				constructionYear: 1979,
				houseNumber: '33',
				type: 'Facade',
				typeDetailed: 'MuurplaatInbouwRvs',
				geographyRD: {
					coordinates: [116211.88, 487352.77],
					type: 'Point',
				},
			}),
		);
		expect(prismaServiceMock.$executeRaw).toHaveBeenCalled();
		expect(returnValue).toEqual(
			expect.objectContaining({
				...createSupportSystemNormalizedInput,
				a11yDetails: createSupportSystemNormalizedInput.a11yDetails,
			}),
		);
	});

	test('getSupportSystems()', async () => {
		prismaServiceMock.$queryRaw.mockResolvedValue([
			{
				geography: JSON.stringify({
					type: 'Point',
					coordinates: [33, 22],
				}),
			},
		]);
		const expected = {
			...domainSupportSystem,
			geography: {
				type: 'Point',
				coordinates: [33, 22],
			},
		};
		const supportSystems = await repository.getSupportSystems('__SURVEY_ID__');
		expect(prismaServiceMock.spanSupportSystems.findMany).toHaveBeenCalledWith({
			where: { surveyId: '__SURVEY_ID__', deleted_at: null },
		});
		expect(supportSystems).toEqual([expected]);
	});

	test('updateSupportSystem()', async () => {
		prismaServiceMock.spanSupportSystems.update.mockResolvedValue(domainSupportSystem);
		prismaServiceMock.$queryRaw.mockResolvedValue([{ geography: JSON.stringify(supportSystem1.geography) }]);
		const spy = jest
			.spyOn(repository, 'getGeographyAsGeoJSON')
			.mockResolvedValue(updateSupportSystemInput.geography);
		const returnValue = await repository.updateSupportSystem(updateSupportSystemNormalizedInput);
		expect(prismaServiceMock.$executeRaw).toHaveBeenCalled();
		expect(prismaServiceMock.spanSupportSystems.update).toHaveBeenCalledWith({
			where: { id: updateSupportSystemNormalizedInput.id },
			data: {
				a11yDetails: { limitationOnTheMaximumHeadroom: true },
				installationHeight: new Decimal(10),
				installationLength: new Decimal(10),
				location: '__LOCATION__',
				locationIndication: '__LOCATION_INDICATION__',
				name: '__NAME__',
				remarks: '__REMARKS__',
				constructionYear: 1979,
				houseNumber: '33',
				typeDetailed: SupportSystemTypeDetailedFacade.MuurplaatInbouwRvs,
				type: SupportSystemType.Facade,
				geographyRD: {
					coordinates: [116211.88, 487352.77],
					type: 'Point',
				},
			},
		});
		expect(spy).toHaveBeenCalledWith(updateSupportSystemNormalizedInput.id);
		expect(returnValue).toEqual({
			id: '1f728e79-1b89-4333-a309-ea93bf17667c',
			deleted_at: null,
			objectId: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
			surveyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
			name: '__NAME__',
			type: SupportSystemType.Facade,
			location: '__LOCATION__',
			locationIndication: '__LOCATION_INDICATION__',
			constructionYear: 1979,
			a11yDetails: updateSupportSystemNormalizedInput.a11yDetails,
			installationHeight: new Decimal(10),
			installationLength: new Decimal(10),
			remarks: '__REMARKS__',
			houseNumber: '33',
			geography: {
				coordinates: [52.370302853062604, 4.893996915500548],
				type: 'Point',
			},
			geographyRD: {
				coordinates: [116211.88, 487352.77],
				type: 'Point',
			},
			typeDetailed: SupportSystemTypeDetailedFacade.MuurplaatInbouwRvs,
			updated_at: undefined,
		});
	});

	test('deleteSupportSystem', async () => {
		prismaServiceMock.spanSupportSystems.update.mockResolvedValue(deletedSupportSystem);
		prismaServiceMock.$queryRaw.mockResolvedValue([{ geography: JSON.stringify(supportSystem1.geography) }]);
		const spy = jest
			.spyOn(repository, 'getGeographyAsGeoJSON')
			.mockResolvedValue(updateSupportSystemInput.geography);
		const identifier = '1f728e79-1b89-4333-a309-ea93bf17667c';
		const supportSystem = await repository.deleteSupportSystem(identifier);
		expect(prismaServiceMock.spanSupportSystems.update).toHaveBeenCalledWith({
			where: { id: identifier },
			data: expect.objectContaining({}),
		});
		expect(supportSystem.deleted_at instanceof Date).toBe(true);
		expect(supportSystem).toEqual(
			expect.objectContaining({
				id: '1f728e79-1b89-4333-a309-ea93bf17667c',
				objectId: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
				surveyId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
				name: '__NAME__',
				type: SupportSystemType.Facade,
				location: '__LOCATION__',
				constructionYear: 1979,
				locationIndication: '__LOCATION_INDICATION__',
				a11yDetails: createSupportSystemNormalizedInput.a11yDetails,
				installationHeight: new Decimal(10),
				installationLength: new Decimal(10),
				remarks: '__REMARKS__',
				houseNumber: '33',
				created_at: undefined,
				updated_at: undefined,
				geography: {
					coordinates: [52.370302853062604, 4.893996915500548],
					type: 'Point',
				},
				geographyRD: {
					coordinates: [116211.88, 487352.77],
					type: 'Point',
				},
				typeDetailed: SupportSystemTypeDetailedFacade.MuurplaatInbouwRvs,
			}),
		);
		expect(spy).toHaveBeenCalledWith(identifier);
	});

	test('getGeographyAsGeoJSON', async () => {
		prismaServiceMock.$queryRaw.mockResolvedValue([{ geography: JSON.stringify(supportSystem1.geography) }]);
		const geography = await repository.getGeographyAsGeoJSON(domainSupportSystem.id);
		expect(geography).toEqual(supportSystem1.geography);
	});

	test('getLuminaireGeographyAsGeoJSON', async () => {
		prismaServiceMock.$queryRaw.mockResolvedValue([{ geography: JSON.stringify(luminaire1.geography) }]);
		const geography = await repository.getLuminaireGeographyAsGeoJSON(domainLuminaire.id);
		expect(geography).toEqual(luminaire1.geography);
	});

	test('cloneSupportSystems', async () => {
		prismaServiceMock.$queryRaw.mockResolvedValue([{ geography: JSON.stringify(supportSystem1.geography) }]);
		const result = await repository.cloneSupportSystems('__Survey_ID__', 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		const geography = await repository.getGeographyAsGeoJSON(domainSupportSystem.id);
		expect(prismaServiceMock.spanSupportSystems.create).toHaveBeenCalled();
		expect(geography).toEqual(supportSystem1.geography);
		expect(result).toEqual([domainSupportSystem]);
	});
});
