import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { MeasureService } from './measure.service';
import { MeasureRepository } from './measure.repository';
import { domainMeasure } from './__stubs__';
import { MeasureFactory } from './measure.factory';
import { Measure } from './models/measure.model';

jest.mock('./measure.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new MeasureRepository(prismaServiceMock);

describe('Measures / Service', () => {
	test('findMeasures returns array of Measure survey', async () => {
		const service = new MeasureService(repo);
		const measures = await service.findMeasures('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(measures).toBeInstanceOf(Array);
		expect(measures[0]).toBeInstanceOf(Measure);
		expect(measures).toEqual([domainMeasure].map((measure) => MeasureFactory.CreateMeasure(measure)));
	});
});
