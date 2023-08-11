import { Test, TestingModule } from '@nestjs/testing';
import { QueryBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { Logger } from '@nestjs/common';

import { SpanInstallationExportController } from './span-installation-export.controller';
import { OVSExportByBatchQuery } from './queries/ovs-export-by-batch.query';

describe('SpanInstallationExporterController', () => {
	let controller: SpanInstallationExportController;
	let queryBus: QueryBus;
	let res: Response;

	beforeEach(async () => {
		// Mock the QueryBus and Response object
		const queryBusMock = {
			execute: jest.fn().mockResolvedValue({ xlsxBuffer: 'xlsx-buffer', fileName: 'xlsx-file-name' }),
		};
		const responseMock = {
			set: jest.fn(),
			send: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [SpanInstallationExportController],
			providers: [{ provide: QueryBus, useValue: queryBusMock }],
		}).compile();

		queryBus = module.get<QueryBus>(QueryBus);
		const logger = new Logger();
		controller = new SpanInstallationExportController(queryBus, logger);
		res = responseMock as unknown as Response;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('exportToXLSX()', () => {
		test('queryBus is called with the correct OVSExportByBatchQuery', async () => {
			await controller.exportToXLSX(res);
			const batchId = '123';
			const response: Response = {} as Response;
			expect(queryBus.execute).toHaveBeenCalledWith(new OVSExportByBatchQuery(response, batchId));
		});
		test('correct headers are being set', async () => {
			await controller.exportToXLSX(res);
			expect(res.set).toHaveBeenCalledWith({
				'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'Content-Disposition': `attachment; filename="xlsx-file-name.xlsx"`,
			});
		});
		test('XLSX buffer is being sent as response', async () => {
			await controller.exportToXLSX(res);
			expect(res.send).toHaveBeenCalledWith('xlsx-buffer');
		});
	});
});
