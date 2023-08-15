import { Test, TestingModule } from '@nestjs/testing';
import { QueryBus } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { SpanInstallationExportController } from './span-installation-export.controller';
import { OVSExportAllQuery } from './queries/ovs-export-all.query';
import { responseMock } from './__mocks__/response';

describe('SpanInstallationExporterController', () => {
	let controller: SpanInstallationExportController;
	let queryBus: QueryBus;

	beforeEach(async () => {
		// Mock the QueryBus and Response object
		const queryBusMock = {
			execute: jest.fn().mockResolvedValue({ xlsxBuffer: 'xlsx-buffer', fileName: 'xlsx-file-name' }),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [SpanInstallationExportController],
			providers: [{ provide: QueryBus, useValue: queryBusMock }],
		}).compile();

		queryBus = module.get<QueryBus>(QueryBus);
		const logger = new Logger();
		controller = new SpanInstallationExportController(queryBus, logger);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('exportToXLSX()', () => {
		test('queryBus is called with the correct OVSExportAllQuery', async () => {
			await controller.exportToXLSX(responseMock);
			expect(queryBus.execute).toHaveBeenCalledWith(new OVSExportAllQuery(responseMock));
		});
	});
});
