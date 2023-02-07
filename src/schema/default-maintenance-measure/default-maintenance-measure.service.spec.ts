import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { domainDefaultMaintenanceMeasure } from './__stubs__';
import { DefaultMaintenanceMeasureRepository } from './default-maintenance-measure.repository';
import { DefaultMaintenanceMeasureService } from './default-maintenance-measure.service';
import { DefaultMaintenanceMeasure } from './models/default-maintenance-measure.model';
import { DefaultMaintenanceMeasureFactory } from './default-maintenance-measure.factory';

jest.mock('./default-maintenance-measure.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new DefaultMaintenanceMeasureRepository(prismaServiceMock);

describe('DefaultMaintenanceMeasure / Service', () => {
	test('getDefaultMaintenanceMeasure returns a defaultMaintenanceMeasure', async () => {
		const service = new DefaultMaintenanceMeasureService(repo);
		const defaultMaintenanceMeasure = await service.getDefaultMaintenanceMeasure(
			'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
		);
		expect(defaultMaintenanceMeasure).toBeInstanceOf(DefaultMaintenanceMeasure);
		expect(defaultMaintenanceMeasure).toEqual(
			DefaultMaintenanceMeasureFactory.CreateDefaultMaintenanceMeasure(domainDefaultMaintenanceMeasure),
		);
	});
});
