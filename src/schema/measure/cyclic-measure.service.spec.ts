import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';
import { DefaultMaintenanceMeasureService } from '../default-maintenance-measure/default-maintenance-measure.service';

import { CyclicMeasureService } from './cyclic-measure.service';
import { CyclicMeasureRepository } from './cyclic-measure.repository';
import { domainCyclicMeasure } from './__stubs__';
import { CyclicMeasureFactory } from './cyclic-measure.factory';
import { CyclicMeasure } from './models/cyclic-measure.model';

jest.mock('./cyclic-measure.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const defaultMaintenanceMeasureServiceMock: MockedObjectDeep<DefaultMaintenanceMeasureService> = {
	...(<any>{}),
};

const repo = new CyclicMeasureRepository(prismaServiceMock, defaultMaintenanceMeasureServiceMock);

describe('CyclicMeasures / Service', () => {
	test('findCyclicMeasures returns array of CyclicMeasure survey', async () => {
		const service = new CyclicMeasureService(repo);
		const cyclicMeasures = await service.findCyclicMeasures('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(cyclicMeasures).toBeInstanceOf(Array);
		expect(cyclicMeasures[0]).toBeInstanceOf(CyclicMeasure);
		expect(cyclicMeasures).toEqual(
			[domainCyclicMeasure].map((cyclicMeasure) => CyclicMeasureFactory.CreateCyclicMeasure(cyclicMeasure)),
		);
	});
});
