import { MockedObjectDeep } from 'ts-jest';
import { Decimal } from '@prisma/client/runtime';

import { PrismaService } from '../../prisma.service';

import { JunctionBoxRepository } from './junction-box.repository';
import {
	deletedJunctionBox,
	domainJunctionBox,
	junctionBox1,
	junctionBoxInput,
	updateJunctionBoxInput,
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

const repo = new JunctionBoxRepository(prismaServiceMock);

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
				a11yDetails: JSON.stringify(junctionBoxInput.a11yDetails),
				installationHeight: new Decimal(10),
				location: '__LOCATION__',
				locationIndication: '__LOCATION_INDICATION__',
				mastNumber: new Decimal(33.33),
				name: '__NAME__',
				remarks: '__REMARKS__',
				riserTubeVisible: true,
			}),
		);
		expect(prismaServiceMock.$executeRaw).toHaveBeenCalled();
		expect(returnValue).toEqual(
			expect.objectContaining({
				...junctionBoxInput,
				a11yDetails: JSON.stringify(junctionBoxInput.a11yDetails),
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
			where: { surveyId: '__SURVEY_ID__' },
		});
		expect(junctionBoxes).toEqual([expected]);
	});

	test('updateJunctionBox()', async () => {
		prismaServiceMock.spanJunctionBoxes.update.mockResolvedValue(domainJunctionBox);
		prismaServiceMock.$queryRaw.mockResolvedValue([{ geography: JSON.stringify(junctionBox1.geography) }]);
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
			},
		});
		expect(spy).toHaveBeenCalledWith(updateJunctionBoxInput.id);
		expect(returnValue).toEqual({
			a11yDetails: JSON.stringify(updateJunctionBoxInput.a11yDetails),

			deleted_at: null,
			geography: {
				coordinates: [52.370302853062604, 4.893996915500548],
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
				a11yDetails: JSON.stringify(junctionBoxInput.a11yDetails),
				geography: {
					coordinates: [52.370302853062604, 4.893996915500548],
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
});
