import { Response } from 'express';
import { Test, TestingModule } from '@nestjs/testing';
import { QueryBus } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { MJOPExportController } from './mjop-export.controller';
import { MJOPExportBySurveyIdQuery } from './queries/mjop-export-by-survey-id.query';
import { MJOPExportByBatchIdQuery } from './queries/mjop-export-by-batch-id.query';
import { MJOPExportByObjectIdQuery } from './queries/mjop-export-by-object-id.query';

describe('MJOPExportController', () => {
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
				Logger,
			],
		}).compile();

		queryBus = module.get<QueryBus>(QueryBus);
	});

	describe('surveyMJOPExport', () => {
		it('should execute MjopExportBySurveyIdQuery with the provided surveyId and response', async () => {
			const surveyId = '123';
			const response: Response = {} as Response;
			const logger = new Logger(); // Create a new instance of Logger
			const controller = new MJOPExportController(queryBus, logger);
			await controller.surveyMJOPExport(surveyId, response);
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

			const logger = new Logger(); // Create a new instance of Logger
			const controller = new MJOPExportController(queryBus, logger);
			await controller.surveyMJOPExport(surveyId, response);
			jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(response);

			expect(queryBus.execute).toHaveBeenCalledWith(new MJOPExportBySurveyIdQuery(surveyId, response));
			expect(response.status).toHaveBeenCalledWith(500);
			expect(response.send).toHaveBeenCalledWith({ error });
		});
	});

	describe('surveyMJOPExportByObjectId', () => {
		it('should execute surveyMJOPExportByObjectIdQuery with the provided objectId and response', async () => {
			const objectId = '123';
			const response: Response = {} as Response;
			const logger = new Logger(); // Create a new instance of Logger
			const controller = new MJOPExportController(queryBus, logger);
			await controller.surveyMJOPExportByObjectId(objectId, response);
			jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(response);

			expect(queryBus.execute).toHaveBeenCalledWith(new MJOPExportByObjectIdQuery(objectId, response));
		});

		it('should handle errors and send 500 response', async () => {
			const objectId = '123';
			const response: Response = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis(),
			} as any;

			const error = new Error('Internal server error');
			jest.spyOn(queryBus, 'execute').mockRejectedValueOnce(error);

			const logger = new Logger(); // Create a new instance of Logger
			const controller = new MJOPExportController(queryBus, logger);
			await controller.surveyMJOPExportByObjectId(objectId, response);
			jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(response);

			expect(queryBus.execute).toHaveBeenCalledWith(new MJOPExportByObjectIdQuery(objectId, response));
			expect(response.status).toHaveBeenCalledWith(500);
			expect(response.send).toHaveBeenCalledWith({ error });
		});
	});

	describe('surveyMJOPExportForBatch', () => {
		it('should execute MjopExportByBatchIdQuery with correct parameters', async () => {
			const batchId = '123';
			const inspectionStandardType = 'fmeca';
			const response: Response = {
				status: jest.fn().mockReturnThis(),
				send: jest.fn().mockReturnThis(),
			} as any;

			const logger = new Logger(); // Create a new instance of Logger
			const controller = new MJOPExportController(queryBus, logger);
			await controller.surveyMJOPExportForBatch(batchId, inspectionStandardType, response);

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

			const logger = new Logger(); // Create a new instance of Logger
			const controller = new MJOPExportController(queryBus, logger);
			await controller.surveyMJOPExportForBatch(batchId, inspectionStandardType, response);

			expect(queryBus.execute).toHaveBeenCalledWith(expect.any(MJOPExportByBatchIdQuery));
			expect(queryBus.execute).toHaveBeenCalledWith(
				new MJOPExportByBatchIdQuery(batchId, inspectionStandardType, response),
			);
			expect(response.status).toHaveBeenCalledWith(500);
			expect(response.send).toHaveBeenCalledWith({ error });
		});
	});
});
