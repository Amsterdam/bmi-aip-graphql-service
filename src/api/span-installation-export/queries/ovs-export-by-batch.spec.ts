import { MockedObjectDeep } from 'ts-jest';
import { Logger } from '@nestjs/common';

import { responseMock } from '../__mocks__/response';
import { SpanInstallationExportService } from '../span-installation-export.service';
import { AddOVSSheetService } from '../add-ovs-sheet.service';
import { ovsAssetStub } from '../__stubs__/ovs-asset';

import { OVSExportByBatchQuery } from './ovs-export-by-batch.query';
import { OVSExportByBatchHandler } from './ovs-export-by-batch.handler';

const mockExporterService: MockedObjectDeep<SpanInstallationExportService> = {
	getObjectsInBatch: jest.fn().mockResolvedValue([ovsAssetStub]),
	...(<any>{}),
};

const mockAddOvsSheetService: MockedObjectDeep<AddOVSSheetService> = {
	addOVSSheet: jest.fn().mockResolvedValue({}),
	...(<any>{}),
};

const mockLogger: MockedObjectDeep<Logger> = {
	...(<any>{
		log: jest.fn(),
		error: jest.fn(),
	}),
};

describe('OVSExportByBatchHandler', () => {
	test('executes query', async () => {
		const batchId = 'batchId';
		const query = new OVSExportByBatchQuery(responseMock, batchId);
		await new OVSExportByBatchHandler(mockExporterService, mockAddOvsSheetService, mockLogger).execute(query);

		expect(mockAddOvsSheetService.addOVSSheet).toHaveBeenCalledTimes(1);
	});

	// it('should return the XLSX buffer', async () => {
	// 	const handler = new OVSExportByBatchHandler(mockExporterService, mockAddOvsSheetService, mockLogger);
	// 	const batchId = 'batchId';
	// 	const query = new OVSExportByBatchQuery(responseMock, batchId);
	// 	expect(Buffer.isBuffer(result.xlsxBuffer)).toBe(true);
	// });

	// it('should return the fileName', async () => {
	// 	const batchId = 'batchId';
	// 	const query = new OVSExportByBatchQuery(responseMock, batchId);

	// 	const handler = new OVSExportByBatchHandler(mockExporterService, mockAddOvsSheetService, mockLogger);
	// 	const result = await handler.execute(query);
	// 	expect(result.fileName).toBe('OVS-export-2023-07-19T12:34:56.789Z');
	// });
});
