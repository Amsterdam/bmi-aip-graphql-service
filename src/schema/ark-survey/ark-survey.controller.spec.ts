import { Test, TestingModule } from '@nestjs/testing';
import { QueryBus } from '@nestjs/cqrs';

import { ArkSurveyController } from './ark-survey.controller';
import { GetArkSurveyBySurveyIdQuery } from './queries/get-ark-survey-by-survey.query';
import { FindArkSurveyReachSegmentsQuery } from './queries/find-ark-survey-reach-segments.query';
import { domainReachSegment } from './__stubs__/reach-segment-stub';
import { domainArkSurvey } from './__stubs__';

describe('ArkSurveyController', () => {
	let queryBus: QueryBus;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ArkSurveyController],
			providers: [
				{
					provide: QueryBus,
					useValue: {
						execute: jest.fn(),
					},
				},
			],
		}).compile();

		queryBus = module.get<QueryBus>(QueryBus);
	});

	describe('getArkSurvey', () => {
		it('should return an ArkSurvey', async () => {
			const surveyId = 'exampleSurveyId';
			const arkSurveyResult = domainArkSurvey;
			const controller = new ArkSurveyController(queryBus);
			jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(arkSurveyResult);

			const result = await controller.getArkSurvey(surveyId);

			expect(queryBus.execute).toHaveBeenCalledWith(new GetArkSurveyBySurveyIdQuery(surveyId));
			expect(result).toBe(arkSurveyResult);
		});
	});

	describe('reachSegments', () => {
		it('should return an array of ReachSegments', async () => {
			const surveyId = 'exampleSurveyId';
			const arkSurveyResult = { id: 'exampleId' };
			const reachSegmentsResult = [domainReachSegment];
			const controller = new ArkSurveyController(queryBus);
			jest.spyOn(queryBus, 'execute')
				.mockResolvedValueOnce(arkSurveyResult)
				.mockResolvedValueOnce(reachSegmentsResult);

			const result = await controller.reachSegments(surveyId);

			expect(queryBus.execute).toHaveBeenNthCalledWith(1, new GetArkSurveyBySurveyIdQuery(surveyId));
			expect(queryBus.execute).toHaveBeenNthCalledWith(
				2,
				new FindArkSurveyReachSegmentsQuery(arkSurveyResult.id),
			);
			expect(result).toBe(reachSegmentsResult);
		});
	});
});
