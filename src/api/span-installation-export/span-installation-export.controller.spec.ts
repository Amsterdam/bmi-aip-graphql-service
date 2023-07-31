import { Test, TestingModule } from '@nestjs/testing';
import { QueryBus } from '@nestjs/cqrs';
import { Response } from 'express';

import { SpanInstallationExportController } from './span-installation-export.controller';
import { ExportBatchDataQuery } from './queries/export-batch-data.query';

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
		controller = new SpanInstallationExportController(queryBus);
		res = responseMock as unknown as Response;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('exportToXLSX()', () => {
		test('queryBus is called with the correct ExportBatchDataQuery', async () => {
			await controller.exportToXLSX(res);
			expect(queryBus.execute).toHaveBeenCalledWith(new ExportBatchDataQuery());
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
