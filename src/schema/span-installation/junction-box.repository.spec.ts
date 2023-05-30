import { MockedObjectDeep } from 'ts-jest';
import { Decimal } from '@prisma/client/runtime';

import { PrismaService } from '../../prisma.service';

import { JunctionBoxRepository } from './junction-box.repository';
import {
	deletedJunctionBox,
	domainJunctionBox,
	domainReviseJunctionBox,
	junctionBox1,
	junctionBoxInput,
	reviseJunctionBox1,
	updateJunctionBoxInput,
	reviseJunctionBoxInput,
	createMissingJunctionBoxInput,
} from './__stubs__';
import type { JunctionBoxWithoutGeography } from './types/junction-box.repository.interface';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	spanJunctionBoxes: {
		create: jest.fn().mockResolvedValue(domainJunctionBox),
		findMany: jest.fn().mockResolvedValue([domainJunctionBox]),
		update: jest.fn().mockResolvedValue(domainJunctionBox),
	},
	$executeRaw: jest.fn(),
	$queryRaw: jest.fn(),
	...(<any>{}),
};

const revisePrismaServiceMock: MockedObjectDeep<PrismaService> = {
	spanJunctionBoxes: {
		create: jest.fn().mockResolvedValue(domainReviseJunctionBox),
		findMany: jest.fn().mockResolvedValue([domainReviseJunctionBox]),
		update: jest.fn().mockResolvedValue(domainReviseJunctionBox),
	},
	$executeRaw: jest.fn(),
	$queryRaw: jest.fn(),
	...(<any>{}),
};

const repo = new JunctionBoxRepository(prismaServiceMock);
const reviseRepo = new JunctionBoxRepository(revisePrismaServiceMock);

describe('Span Installation / JunctionBox / Repository', () => {
	test('createJunctionBox()', async () => {
		const returnValue = await repo.createJunctionBox(junctionBoxInput);
		const junctionBox = prismaServiceMock.spanJunctionBoxes.create.mock.calls[0][0]
			.data as JunctionBoxWithoutGeography;

		expect(junctionBox).toEqual(
			expect.objectContaining({
				id: junctionBox.id,
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
				a11yDetails: junctionBoxInput.a11yDetails,
				installationHeight: new Decimal(10),
				location: '__LOCATION__',
				locationIndication: '__LOCATION_INDICATION__',
				mastNumber: new Decimal(33.33),
				name: '__NAME__',
				remarks: '__REMARKS__',
				riserTubeVisible: true,
				geographyRD: {
					coordinates: [116211.88, 487352.77],
					type: 'Point',
				},
			}),
		);
		expect(prismaServiceMock.$executeRaw).toHaveBeenCalled();
		expect(returnValue).toEqual(
			expect.objectContaining({
				...junctionBoxInput,
				a11yDetails: junctionBoxInput.a11yDetails,
			}),
		);
	});

	test('createMissingJunctionBox()', async () => {
		const returnValue = await reviseRepo.createMissingJunctionBox(createMissingJunctionBoxInput);
		const junctionBox = revisePrismaServiceMock.spanJunctionBoxes.create.mock.calls[0][0]
			.data as JunctionBoxWithoutGeography;

		expect(junctionBox).toEqual(
			expect.objectContaining({
				id: junctionBox.id,
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
				a11yDetails: junctionBoxInput.a11yDetails,
				installationHeight: new Decimal(10),
				location: '__LOCATION__',
				locationIndication: '__LOCATION_INDICATION__',
				mastNumber: new Decimal(33.33),
				name: '__NAME__',
				remarks: '__REMARKS__',
				riserTubeVisible: true,
				geographyRD: {
					coordinates: [116211.88, 487352.77],
					type: 'Point',
				},
				permanentId: junctionBox.id,
				remarksRevision: '__REMARKS_REVISION__',
			}),
		);
		expect(revisePrismaServiceMock.$executeRaw).toHaveBeenCalled();
		expect(returnValue).toEqual(
			expect.objectContaining({
				...createMissingJunctionBoxInput,
				a11yDetails: createMissingJunctionBoxInput.a11yDetails,
			}),
		);
	});

	test('getJunctionBoxes()', async () => {
		prismaServiceMock.$queryRaw.mockResolvedValue([
			{
				geography: JSON.stringify({
					type: 'Point',
					coordinates: [33, 22],
				}),
			},
		]);
		const expected = {
			...domainJunctionBox,
			geography: {
				type: 'Point',
				coordinates: [33, 22],
			},
		};

		const junctionBoxes = await repo.getJunctionBoxes('__SURVEY_ID__');
		expect(prismaServiceMock.spanJunctionBoxes.findMany).toHaveBeenCalledWith({
			where: { surveyId: '__SURVEY_ID__', deleted_at: null },
		});
		expect(junctionBoxes).toEqual([expected]);
	});

	test('reviseJunctionBox()', async () => {
		revisePrismaServiceMock.spanJunctionBoxes.update.mockResolvedValue(domainReviseJunctionBox);
		revisePrismaServiceMock.$queryRaw.mockResolvedValue([
			{ geography: JSON.stringify(reviseJunctionBox1.geography) },
		]);
		revisePrismaServiceMock.$queryRaw.mockResolvedValue([
			{ geographyRD: JSON.stringify(reviseJunctionBox1.geographyRD) },
		]);
		const spy = jest.spyOn(reviseRepo, 'getGeographyAsGeoJSON').mockResolvedValue(reviseJunctionBoxInput.geography);
		const returnValue = await reviseRepo.reviseJunctionBox(reviseJunctionBoxInput);
		expect(revisePrismaServiceMock.$executeRaw).toHaveBeenCalled();
		expect(revisePrismaServiceMock.spanJunctionBoxes.update).toHaveBeenCalledWith({
			where: { id: reviseJunctionBoxInput.id },
			data: {
				a11yDetails: { limitationOnTheMaximumHeadroom: true },
				installationHeight: new Decimal(10),
				location: '__LOCATION__',
				locationIndication: '__LOCATION_INDICATION__',
				mastNumber: new Decimal('33.33'),
				name: '__NAME__',
				remarks: '__REMARKS__',
				riserTubeVisible: true,
				geographyRD: {
					coordinates: [116211.88, 487352.77],
					type: 'Point',
				},
				remarksRevision: '__REMARKS_REVISION__',
			},
		});
		expect(spy).toHaveBeenCalledWith(reviseJunctionBoxInput.id);
		expect(returnValue).toEqual({
			a11yDetails: reviseJunctionBoxInput.a11yDetails,
			deleted_at: null,
			geography: {
				coordinates: [52.370302853062604, 4.893996915500548],
				type: 'Point',
			},
			geographyRD: {
				coordinates: [116211.88, 487352.77],
				type: 'Point',
			},
			id: '1f728e79-1b89-4333-a309-ea93bf17667c',
			installationHeight: new Decimal(10),
			location: '__LOCATION__',
			locationIndication: '__LOCATION_INDICATION__',
			mastNumber: new Decimal(33.33),
			name: '__NAME__',
			objectId: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
			remarks: '__REMARKS__',
			riserTubeVisible: true,
			surveyId: '68a95a2c-b909-e77f-4d66-9fd5afef5afb',
			permanentId: '1f728e79-1b89-4333-a309-ea93bf17667c',
			remarksRevision: '__REMARKS_REVISION__',
		});
	});

	test('updateJunctionBox()', async () => {
		prismaServiceMock.spanJunctionBoxes.update.mockResolvedValue(domainJunctionBox);
		prismaServiceMock.$queryRaw.mockResolvedValue([{ geography: JSON.stringify(junctionBox1.geography) }]);
		prismaServiceMock.$queryRaw.mockResolvedValue([{ geographyRD: JSON.stringify(junctionBox1.geographyRD) }]);
		const spy = jest.spyOn(repo, 'getGeographyAsGeoJSON').mockResolvedValue(updateJunctionBoxInput.geography);
		const returnValue = await repo.updateJunctionBox(updateJunctionBoxInput);
		expect(prismaServiceMock.$executeRaw).toHaveBeenCalled();
		expect(prismaServiceMock.spanJunctionBoxes.update).toHaveBeenCalledWith({
			where: { id: updateJunctionBoxInput.id },
			data: {
				a11yDetails: { limitationOnTheMaximumHeadroom: true },
				installationHeight: new Decimal(10),
				location: '__LOCATION__',
				locationIndication: '__LOCATION_INDICATION__',
				mastNumber: new Decimal('33.33'),
				name: '__NAME__',
				remarks: '__REMARKS__',
				riserTubeVisible: true,
				geographyRD: {
					coordinates: [116211.88, 487352.77],
					type: 'Point',
				},
			},
		});
		expect(spy).toHaveBeenCalledWith(updateJunctionBoxInput.id);
		expect(returnValue).toEqual({
			a11yDetails: updateJunctionBoxInput.a11yDetails,
			deleted_at: null,
			geography: {
				coordinates: [52.370302853062604, 4.893996915500548],
				type: 'Point',
			},
			geographyRD: {
				coordinates: [116211.88, 487352.77],
				type: 'Point',
			},
			id: '1f728e79-1b89-4333-a309-ea93bf17667c',
			installationHeight: new Decimal(10),
			location: '__LOCATION__',
			locationIndication: '__LOCATION_INDICATION__',
			mastNumber: new Decimal(33.33),
			name: '__NAME__',
			objectId: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
			remarks: '__REMARKS__',
			riserTubeVisible: true,
			surveyId: '68a95a2c-b909-e77f-4d66-9fd5afef5afb',
			permanentId: '1f728e79-1b89-4333-a309-ea93bf17667c',
			remarksRevision: null,
		});
	});

	test('deleteJunctionBox', async () => {
		prismaServiceMock.spanJunctionBoxes.update.mockResolvedValue(deletedJunctionBox);
		prismaServiceMock.$queryRaw.mockResolvedValue([{ geography: JSON.stringify(junctionBox1.geography) }]);
		const spy = jest.spyOn(repo, 'getGeographyAsGeoJSON').mockResolvedValue(updateJunctionBoxInput.geography);
		const identifier = '610d0b4e-c06f-4894-9f60-8e1d0f78d2f1';
		const junctionBox = await repo.deleteJunctionBox(identifier);
		expect(prismaServiceMock.spanJunctionBoxes.update).toHaveBeenCalledWith({
			where: { id: identifier },
			data: expect.objectContaining({}),
		});
		expect(junctionBox.deleted_at instanceof Date).toBe(true);
		expect(junctionBox).toEqual(
			expect.objectContaining({
				a11yDetails: junctionBoxInput.a11yDetails,
				geography: {
					coordinates: [52.370302853062604, 4.893996915500548],
					type: 'Point',
				},
				geographyRD: {
					coordinates: [116211.88, 487352.77],
					type: 'Point',
				},
				id: '1f728e79-1b89-4333-a309-ea93bf17667c',
				installationHeight: new Decimal(10),
				location: '__LOCATION__',
				locationIndication: '__LOCATION_INDICATION__',
				mastNumber: new Decimal(33.33),
				name: '__NAME__',
				objectId: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
				remarks: '__REMARKS__',
				riserTubeVisible: true,
				surveyId: '68a95a2c-b909-e77f-4d66-9fd5afef5afb',
			}),
		);
		expect(spy).toHaveBeenCalledWith(identifier);
	});

	test('getGeographyAsGeoJSON', async () => {
		prismaServiceMock.$queryRaw.mockResolvedValue([{ geography: JSON.stringify(junctionBox1.geography) }]);
		const geography = await repo.getGeographyAsGeoJSON(domainJunctionBox.id);
		expect(geography).toEqual(junctionBox1.geography);
	});

	test('cloneJunctionBoxes', async () => {
		await repo.cloneJunctionBoxes('__SURVEY_ID___', '__OVS_SURVEY_ID__');
		const geography = await repo.getGeographyAsGeoJSON(domainJunctionBox.id);
		expect(prismaServiceMock.spanJunctionBoxes.findMany).toHaveBeenCalledWith({
			where: { surveyId: '__OVS_SURVEY_ID__' },
		});
		expect(prismaServiceMock.spanJunctionBoxes.create).toHaveBeenCalled();
		expect(prismaServiceMock.$executeRaw).toHaveBeenCalled();
		expect(geography).toEqual(junctionBox1.geography);
	});
});
