import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { SpanMeasuresSurveyRepository } from './span-measures-survey.repository';
import {
	updateSpanMeasuresSurveyInput,
	SpanMeasuresSurvey as domainSpanMeasuresSurvey,
	spanMeasuresSurveyRaw,
} from './__stubs__/span-measures-survey-stub';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	surveys: {
		update: jest.fn().mockResolvedValue(domainSpanMeasuresSurvey),
		findFirst: jest.fn().mockResolvedValue([domainSpanMeasuresSurvey]),
	},
	$executeRaw: jest.fn(),
	$queryRaw: jest.fn(),
	...(<any>{}),
};

const identifier = '9c612187-581b-4be3-902c-9e8035d1d3b7';

describe('Span Measures survey / Repository', () => {
	test('updateSpanMeasuresSurvey()', async () => {
		updateSpanMeasuresSurveyInput.surveyId = '68a95a2c-b909-e77f-4d66-9fd5afef5adb';
		const returnValue = await new SpanMeasuresSurveyRepository(prismaServiceMock).updateSpanMeasuresSurvey(
			updateSpanMeasuresSurveyInput,
		);
		expect(prismaServiceMock.surveys.update).toHaveBeenCalledWith({
			where: { id: updateSpanMeasuresSurveyInput.surveyId },
			data: spanMeasuresSurveyRaw,
		});
		expect(returnValue).toEqual(
			expect.objectContaining({
				...domainSpanMeasuresSurvey,
			}),
		);
	});

	test('completeSpanMeasuresSurvey()', async () => {
		updateSpanMeasuresSurveyInput.surveyId = '68a95a2c-b909-e77f-4d66-9fd5afef5adb';
		const returnValue = await new SpanMeasuresSurveyRepository(prismaServiceMock).completeSpanMeasuresSurvey(
			updateSpanMeasuresSurveyInput,
		);
		expect(prismaServiceMock.surveys.update).toHaveBeenCalledWith({
			where: { id: updateSpanMeasuresSurveyInput.surveyId },
			data: spanMeasuresSurveyRaw,
		});
		expect(returnValue).toEqual(
			expect.objectContaining({
				...domainSpanMeasuresSurvey,
			}),
		);
	});

	test('getSpanMeasuresSurvey', async () => {
		const survey = await new SpanMeasuresSurveyRepository(prismaServiceMock).getSpanMeasuresSurvey(identifier);
		expect(prismaServiceMock.surveys.findFirst).toHaveBeenCalledWith({
			where: { id: identifier },
		});
		expect(survey[0]).toEqual(domainSpanMeasuresSurvey);
	});
});
