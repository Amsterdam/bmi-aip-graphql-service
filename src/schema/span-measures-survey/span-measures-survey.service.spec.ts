import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { SpanMeasuresSurveyService } from './span-measures-survey.service';
import { SpanMeasuresSurveyRepository } from './span-measures-survey.repository';
import { domainSpanMeasuresSurvey } from './__stubs__/span-measures-survey-stub';
import { SpanMeasuresSurveyFactory } from './span-measures-survey.factory';
import { SpanMeasuresSurvey } from './models/span-measures-survey.model';

jest.mock('./span-measures-survey.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new SpanMeasuresSurveyRepository(prismaServiceMock);

describe('Span measures survey / Service', () => {
	test('getSpanMeasuresService returns an SpanMeasuresSurvey object', async () => {
		const service = new SpanMeasuresSurveyService(repo);
		const SpanMeasuresSurveyResults = await service.getSpanMeasuresSurvey('9c612187-581b-4be3-902c-9e8035d1d3b7');

		expect(SpanMeasuresSurveyResults).toBeInstanceOf(SpanMeasuresSurvey);
		expect(SpanMeasuresSurveyResults).toEqual(
			SpanMeasuresSurveyFactory.CreateSpanMeasuresSurvey(domainSpanMeasuresSurvey),
		);
	});
});
