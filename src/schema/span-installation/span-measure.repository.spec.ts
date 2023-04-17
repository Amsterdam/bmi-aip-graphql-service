import { PrismaService } from 'src/prisma.service';
import { MockedObjectDeep } from 'ts-jest';

import { domainSpanMeasure } from './__stubs__/span-measure';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	spanMeasures: {
		create: jest.fn().mockResolvedValue(domainSpanMeasure),
		findMany: jest.fn().mockResolvedValue([domainSpanMeasure]),
		update: jest.fn().mockResolvedValue(domainSpanMeasure),
	},
	$executeRaw: jest.fn(),
	$queryRaw: jest.fn(),
	...(<any>{}),
};

describe('Span Installation / Measure / Repository', () => {
	beforeEach(() => {
		// repository = new SpanMeasureRepository(prismaServiceMock);
	});

	test('getSpanMeasures()', async () => {
		expect(prismaServiceMock.spanMeasures.findMany).toHaveBeenCalledWith({
			where: { surveyId: '__SURVEY_ID__' },
		});
	});
});
