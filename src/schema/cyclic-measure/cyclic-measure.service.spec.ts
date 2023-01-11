import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { CyclicMeasureService } from './cyclic-measure.service';
import { CyclicMeasureRepository } from './cyclic-measure.repository';
import { domainCyclicMeasure } from './__stubs__';
import { CyclicMeasureFactory } from './cyclic-measure.factory';
import { CyclicMeasure } from './models/cyclic-measure.model';

jest.mock('./cyclic-measure.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new CyclicMeasureRepository(prismaServiceMock);

describe('CyclicMeasures / Service', () => {
	test('getCyclicMeasures returns array of CyclicMeasure unit', async () => {
		const service = new CyclicMeasureService(repo);
		const cyclicMeasures = await service.getCyclicMeasures('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(cyclicMeasures).toBeInstanceOf(Array);
		expect(cyclicMeasures[0]).toBeInstanceOf(CyclicMeasure);
		expect(cyclicMeasures).toEqual(
			[domainCyclicMeasure].map((cyclicMeasure) => CyclicMeasureFactory.CreateCyclicMeasure(cyclicMeasure)),
		);
	});
});
