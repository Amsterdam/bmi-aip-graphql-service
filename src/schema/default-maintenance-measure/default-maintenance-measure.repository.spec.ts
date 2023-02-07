import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { domainDefaultMaintenanceMeasure } from './__stubs__';
import { DefaultMaintenanceMeasureRepository } from './default-maintenance-measure.repository';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	defaultMaintenanceMeasures: {
		findUnique: jest.fn().mockResolvedValue(domainDefaultMaintenanceMeasure),
	},
	...(<any>{}),
};

const repo = new DefaultMaintenanceMeasureRepository(prismaServiceMock);

describe('DefaultMaintenanceMeasure / Repository', () => {
	test('getDefaultMaintenanceMeasure()', async () => {
		expect(await repo.getDefaultMaintenanceMeasure(domainDefaultMaintenanceMeasure.id)).toEqual(
			domainDefaultMaintenanceMeasure,
		);
	});
});
