import { MockedObjectDeep } from 'ts-jest';
import { Logger } from '@nestjs/common';

import { responseMock } from '../__mocks__/response';
import { SpanInstallationExportService } from '../span-installation-export.service';
import { AddOVSSheetService } from '../add-ovs-sheet.service';
import { ovsAssetStub } from '../__stubs__/ovs-asset';

import { OVSExportAllQuery } from './ovs-export-all.query';
import { OVSExportAllHandler } from './ovs-export-all.handler';

const mockExporterService: MockedObjectDeep<SpanInstallationExportService> = {
	getObjectsInAllBatches: jest.fn().mockResolvedValue([ovsAssetStub]),
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

describe('OVSExportAllHandler', () => {
	test('executes query', async () => {
		const query = new OVSExportAllQuery(responseMock);
		await new OVSExportAllHandler(mockExporterService, mockAddOvsSheetService, mockLogger).execute(query);

		expect(mockAddOvsSheetService.addOVSSheet).toHaveBeenCalledTimes(1);
	});

	it('should return the XLSX buffer', async () => {
		const handler = new OVSExportAllHandler(mockExporterService, mockAddOvsSheetService, mockLogger);
		await handler.execute(new OVSExportAllQuery(responseMock));
		expect(Buffer.isBuffer(result.xlsxBuffer)).toBe(true);
	});

	it('should return the fileName', async () => {
		const handler = new OVSExportAllHandler(mockExporterService, mockAddOvsSheetService, mockLogger);
		const result = await handler.execute(new OVSExportAllQuery(responseMock));
		expect(result.fileName).toBe('OVS-export-2023-07-19T12:34:56.789Z');
	});
});
