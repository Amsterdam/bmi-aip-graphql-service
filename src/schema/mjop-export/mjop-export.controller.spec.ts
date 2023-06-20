import { Response } from 'express';
import { Test, TestingModule } from '@nestjs/testing';
import { QueryBus } from '@nestjs/cqrs';

import { MJOPExportController } from './mjop-export.controller';
import { MJOPExportBySurveyIdQuery } from './queries/mjop-export-by-survey-id.query';
import { MJOPExportByBatchIdQuery } from './queries/mjop-export-by-batch-id.query';

describe('MjopExportController', () => {
	let queryBus: QueryBus;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [MJOPExportController],
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

	describe('surveyMjopExport', () => {
		it('should execute MjopExportBySurveyIdQuery with the provided surveyId and response', async () => {
			const surveyId = '123';
			const response: Response = {} as Response;
			const controller = new MJOPExportController(queryBus);
			await controller.surveyMjopExport(surveyId, response);
			jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(response);

			expect(queryBus.execute).toHaveBeenCalledWith(new MJOPExportBySurveyIdQuery(surveyId, response));
		});

		it('should handle errors and send 500 response', async () => {
			const surveyId = '123';
			const response: Response = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis(),
			} as any;

			const error = new Error('Internal server error');
			jest.spyOn(queryBus, 'execute').mockRejectedValueOnce(error);

			const controller = new MJOPExportController(queryBus);
			await controller.surveyMjopExport(surveyId, response);
			jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(response);

			expect(queryBus.execute).toHaveBeenCalledWith(new MJOPExportBySurveyIdQuery(surveyId, response));
			expect(response.status).toHaveBeenCalledWith(500);
			expect(response.send).toHaveBeenCalledWith({ error });
		});
	});
	describe('surveyMjopExportForBatch', () => {
		it('should execute MjopExportByBatchIdQuery with correct parameters', async () => {
			const batchId = '123';
			const inspectionStandardType = 'fmeca';
			const response: Response = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis(),
			} as any;

			const controller = new MJOPExportController(queryBus);
			await controller.surveyMjopExportForBatch(batchId, inspectionStandardType, response);

			expect(queryBus.execute).toHaveBeenCalledWith(expect.any(MJOPExportByBatchIdQuery));
			expect(queryBus.execute).toHaveBeenCalledWith(
				new MJOPExportByBatchIdQuery(batchId, inspectionStandardType, response),
			);
		});

		it('should handle errors and send response with status 500', async () => {
			const batchId = '123';
			const inspectionStandardType = 'fmeca';
			const response: Response = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis(),
			} as any;
			const error = new Error('Something went wrong');

			jest.spyOn(queryBus, 'execute').mockRejectedValueOnce(error);

			const controller = new MJOPExportController(queryBus);
			await controller.surveyMjopExportForBatch(batchId, inspectionStandardType, response);

			expect(queryBus.execute).toHaveBeenCalledWith(expect.any(MJOPExportByBatchIdQuery));
			expect(queryBus.execute).toHaveBeenCalledWith(
				new MJOPExportByBatchIdQuery(batchId, inspectionStandardType, response),
			);
			expect(response.status).toHaveBeenCalledWith(500);
			expect(response.send).toHaveBeenCalledWith({ error });
		});
	});
});
