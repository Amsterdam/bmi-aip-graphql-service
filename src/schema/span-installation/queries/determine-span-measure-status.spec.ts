import { MockedObjectDeep } from 'ts-jest';

import { SpanMeasureStatus } from '../types/span-measure-status';
import { SpanMeasureRepository } from '../span-measure.repository';
import { PrismaService } from '../../../prisma.service';

import { DetermineSpanMeasureStatusHandler } from './determine-span-measure-status.handler';
import { DetermineSpanMeasureStatusQuery } from './determine-span-measure-status.query';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repository = new SpanMeasureRepository(prismaServiceMock);
const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('DetermineSpanMeasureStatusHandler', () => {
	test('executes query', async () => {
		const query = new DetermineSpanMeasureStatusQuery(identifier);
		const result = await new DetermineSpanMeasureStatusHandler(repository).execute(query);

		expect(result).toEqual(SpanMeasureStatus.open);
	});
});
