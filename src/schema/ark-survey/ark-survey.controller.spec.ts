import { Test, TestingModule } from '@nestjs/testing';
import { QueryBus } from '@nestjs/cqrs';

import { ArkSurveyController } from './ark-survey.controller';
import { domainArkSurvey } from './__stubs__';
import { FindArkSurveysByAssetCodeQuery } from './queries/find-ark-surveys-by-asset-code.query';

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

	describe('getArkSurveys', () => {
		it('should return an array of ArkSurvey', async () => {
			const surveyId = 'exampleSurveyId';
			const arkSurveyResult = domainArkSurvey;
			const controller = new ArkSurveyController(queryBus);
			jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(arkSurveyResult);

			const result = await controller.getArkSurveys(surveyId);

			expect(queryBus.execute).toHaveBeenCalledWith(new FindArkSurveysByAssetCodeQuery(surveyId));
			expect(result).toBe(arkSurveyResult);
		});
	});
});
