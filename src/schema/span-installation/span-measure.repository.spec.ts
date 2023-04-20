import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { SpanMeasureRepository } from './span-measure.repository';
import { domainSpanMeasure, createSpanMeasureInput, updateSpanMeasureInput } from './__stubs__/span-measure';

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
				name: '__NAME__',
				decompositionType: 'SpanMeasure',
				decompositionId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
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
		expect(prismaServiceMock.spanMeasures.update).toHaveBeenCalledWith({
			where: { id: updateSpanMeasureInput.id },
			data: {
				name: '__NAME__',
				decompositionType: 'SpanMeasure',
				decompositionId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
			},
		});

		expect(returnValue).toEqual({
			id: '1f728e79-1b89-4333-a309-ea93bf17667c',
			surveyId: '0deb07f3-28f5-47e1-b72a-d1b2a19d4670',
			decompositionId: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
			decompositionType: 'SpanMeasure',
			name: '__NAME__',
		});
	});
});
