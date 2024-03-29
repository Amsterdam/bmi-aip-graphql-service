import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { MeasureRepository } from './measure.repository';
import {
	deletedMeasure,
	domainMeasure,
	measureInput,
	measureInputWithOptionalFields,
	updateMeasureInput,
} from './__stubs__';
import { MeasureTypes, QuantityUnitOfMeasurement } from './types/measure';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	measures: {
		create: jest.fn().mockResolvedValue(domainMeasure),
		findMany: jest.fn().mockResolvedValue([domainMeasure]),
		update: jest.fn().mockResolvedValue(domainMeasure),
		delete: jest.fn().mockResolvedValue(deletedMeasure),
	},
	...(<any>{}),
};

const repo = new MeasureRepository(prismaServiceMock);

describe('MeasureRepository', () => {
	test('createMeasure()', async () => {
		await repo.createMeasure(measureInput);
		expect(prismaServiceMock.measures.create).toHaveBeenCalledWith({
			data: expect.objectContaining({
				maintenanceType: MeasureTypes.CorrectiveMaintenance,
				surveys: {
					connect: {
						id: '68a95a2c-b909-e77f-4d66-9fd5afef5adb',
					},
				},
				units: {
					connect: {
						id: '68a95a2c-b909-e77f-4d66-9fd5afef5afb',
					},
				},
				planYear: 2010,
				finalPlanYear: 2010,
				costSurcharge: 7.3,
				quantity: 20,
				unitPrice: 33.99,
				quantityUnitOfMeasurement: QuantityUnitOfMeasurement.m2,
				location: '__LOCATION__',
				description: '__DESCTIPTION__',
			}),
		});
	});
	test('createMeasure() with optional fields', async () => {
		await repo.createMeasure(measureInputWithOptionalFields);
		expect(prismaServiceMock.measures.create).toHaveBeenCalledWith({
			data: expect.objectContaining({
				maintenanceType: MeasureTypes.CorrectiveMaintenance,
				surveys: {
					connect: {
						id: '68a95a2c-b909-e77f-4d66-9fd5afef5adb',
					},
				},
				units: {
					connect: {
						id: '68a95a2c-b909-e77f-4d66-9fd5afef5afb',
					},
				},
				failureModes: {
					connect: {
						id: '__FAILURE_MODE_ID__',
					},
				},
				manifestations: {
					connect: {
						id: '__MANIFESTATION_ID__',
					},
				},
				defects: {
					connect: {
						id: '__DEFECT_ID__',
					},
				},
				planYear: 2010,
				finalPlanYear: 2010,
				costSurcharge: 7.3,
				quantity: 20,
				unitPrice: 33.99,
				quantityUnitOfMeasurement: QuantityUnitOfMeasurement.m2,
				location: '__LOCATION__',
				description: '__DESCTIPTION__',
			}),
		});
	});

	test('findMeasures()', async () => {
		const measures = await repo.findMeasures('__SURVEY_ID__');
		expect(prismaServiceMock.measures.findMany).toHaveBeenCalledWith({
			where: { surveyId: '__SURVEY_ID__', deleted_at: null },
		});
		expect(measures).toEqual([domainMeasure]);
	});

	test('updateMeasure()', async () => {
		await repo.updateMeasure(updateMeasureInput);
		expect(prismaServiceMock.measures.update).toHaveBeenCalledWith({
			where: { id: updateMeasureInput.id },
			data: expect.objectContaining({
				maintenanceType: MeasureTypes.CorrectiveMaintenance,
				planYear: 2010,
				finalPlanYear: 2010,
				costSurcharge: 7.3,
				quantity: 20,
				unitPrice: 33.99,
				quantityUnitOfMeasurement: QuantityUnitOfMeasurement.m2,
				location: '__LOCATION__',
				description: '__DESCTIPTION__',
			}),
		});
	});

	test('deleteMeasure', async () => {
		// @ts-ignore
		prismaServiceMock.measures.update.mockResolvedValue(deletedMeasure);
		const identifier = '610d0b4e-c06f-4894-9f60-8e1d0f78d2f1';
		const measure = await repo.deleteMeasure(identifier);
		expect(prismaServiceMock.measures.update).toHaveBeenCalledWith({
			where: { id: identifier },
			data: expect.objectContaining({}),
		});
		expect(measure.deleted_at instanceof Date).toBe(true);
	});
});
