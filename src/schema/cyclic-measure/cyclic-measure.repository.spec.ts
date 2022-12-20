import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { CyclicMeasureRepository } from './cyclic-measure.repository';
import { deletedCyclicMeasure, domainCyclicMeasure, cyclicMeasureInput, updateCyclicMeasureInput } from './__stubs__';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	cyclicMeasures: {
		create: jest.fn().mockResolvedValue(domainCyclicMeasure),
		findMany: jest.fn().mockResolvedValue([domainCyclicMeasure]),
		update: jest.fn().mockResolvedValue(domainCyclicMeasure),
	},
	...(<any>{}),
};

const repo = new CyclicMeasureRepository(prismaServiceMock);

describe('CyclicMeasureRepository', () => {
	test('createCyclicMeasure()', async () => {
		await repo.createCyclicMeasure(cyclicMeasureInput);
		expect(prismaServiceMock.cyclicMeasures.create).toHaveBeenCalledWith({
			data: expect.objectContaining({
				maintenanceType: '__MAINTENANCETYPE__',
				units: {
					connect: {
						id: '68a95a2c-b909-e77f-4d66-9fd5afef5afb',
					},
				},
				defaultMaintenanceMeasures: {
					connect: {
						id: '68a95a2c-b909-e77f-4d66-9fd5afef5af3',
					},
				},
				planYear: 2010,
				finalPlanYear: 2010,
				costSurcharge: 7.3,
				remarks: '__REMARKS__',
				cycle: 2.3,
				unitPrice: 33.99,
				quantityUnitOfMeasurement: '',
			}),
		});
	});

	test('getCyclicMeasures()', async () => {
		const cyclicMeasures = await repo.getCyclicMeasures('__UNIT_ID__');
		expect(prismaServiceMock.cyclicMeasures.findMany).toHaveBeenCalledWith({
			where: { unitId: '__UNIT_ID__' },
		});
		expect(cyclicMeasures).toEqual([domainCyclicMeasure]);
	});

	test('updateCyclicMeasure()', async () => {
		await repo.updateCyclicMeasure(updateCyclicMeasureInput);
		expect(prismaServiceMock.cyclicMeasures.update).toHaveBeenCalledWith({
			where: { id: updateCyclicMeasureInput.id },
			data: expect.objectContaining({
				maintenanceType: '__MAINTENANCETYPE__',
				planYear: 2010,
				finalPlanYear: 2010,
				costSurcharge: 7.3,
				remarks: '__REMARKS__',
				cycle: 2.3,
				unitPrice: 33.99,
				quantityUnitOfMeasurement: '',
			}),
		});
	});

	test('deleteCyclicMeasure', async () => {
		// @ts-ignore
		prismaServiceMock.cyclicMeasures.update.mockResolvedValue(deletedCyclicMeasure);
		const identifier = '610d0b4e-c06f-4894-9f60-8e1d0f78d2f1';
		const cyclicMeasure = await repo.deleteCyclicMeasure(identifier);
		expect(prismaServiceMock.cyclicMeasures.update).toHaveBeenCalledWith({
			where: { id: identifier },
			data: expect.objectContaining({}),
		});
		expect(cyclicMeasure.deleted_at instanceof Date).toBe(true);
	});
});
