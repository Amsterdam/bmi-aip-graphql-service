import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { SpanMeasureRepository } from './span-measure.repository';
import { domainSpanMeasure, createSpanMeasureInput, updateSpanMeasureInput } from './__stubs__/span-measure';
import { domainJunctionBox, domainLuminaire, domainSupportSystem } from './__stubs__';
import { SpanDecompositionItemType } from './types/span-decomposition-item-type';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	spanMeasures: {
		create: jest.fn().mockResolvedValue(domainSpanMeasure),
		findMany: jest.fn().mockResolvedValue([domainSpanMeasure]),
		update: jest.fn().mockResolvedValue(domainSpanMeasure),
	},
	spanSupportSystems: {
		findFirst: jest.fn().mockResolvedValue(domainSupportSystem),
	},
	spanLuminaires: {
		findFirst: jest.fn().mockResolvedValue(domainLuminaire),
	},
	spanJunctionBoxes: {
		findFirst: jest.fn().mockResolvedValue(domainJunctionBox),
	},
	$executeRaw: jest.fn(),
	$queryRaw: jest.fn(),
	...(<any>{}),
};

let repository: SpanMeasureRepository;

describe('Span Installation / Measures / Repository', () => {
	beforeEach(() => {
		repository = new SpanMeasureRepository(prismaServiceMock);
	});

	test('createSpanMeasure()', async () => {
		const returnValue = await repository.createSpanMeasure(domainSpanMeasure);
		const spanMeasure = prismaServiceMock.spanMeasures.create.mock.calls[0][0].data;

		expect(spanMeasure).toEqual(
			expect.objectContaining({
				id: spanMeasure.id,
				surveys: {
					connect: {
						id: '0deb07f3-28f5-47e1-b72a-d1b2a19d4670',
					},
				},
				description: '__NAME__',
				optionId: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
				decompositionItemType: SpanDecompositionItemType.spanSupportSystemMast,
				decompositionItemId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
			}),
		);

		expect(returnValue).toEqual(
			expect.objectContaining({
				...createSpanMeasureInput,
			}),
		);
	});

	test('findSpanMeasures()', async () => {
		const expected = {
			...domainSpanMeasure,
		};
		const spanMeasures = await repository.findSpanMeasures('__SURVEY_ID__');
		expect(prismaServiceMock.spanMeasures.findMany).toHaveBeenCalledWith({
			where: { surveyId: '__SURVEY_ID__' },
		});
		expect(spanMeasures).toEqual([expected]);
	});

	test('updateSpanMeasure()', async () => {
		prismaServiceMock.spanMeasures.update.mockResolvedValue(domainSpanMeasure);
		const returnValue = await repository.updateSpanMeasure(updateSpanMeasureInput);

		expect(returnValue).toEqual({
			id: '1f728e79-1b89-4333-a309-ea93bf17667c',
			optionId: '9812a0c4-9cb4-4df2-b490-7a5648922f79',
			surveyId: '0deb07f3-28f5-47e1-b72a-d1b2a19d4670',
			decompositionItemId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
			decompositionItemType: SpanDecompositionItemType.spanSupportSystemMast,
			description: '__NAME__',
			created_at: null,
			updated_at: null,
		});
	});
});
