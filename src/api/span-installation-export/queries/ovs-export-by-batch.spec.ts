import { MockedObjectDeep } from 'ts-jest';
import { Logger } from '@nestjs/common';

import { responseMock } from '../__mocks__/response';
import { mockExporterService, mockAddOvsSheetService, mockLogger } from '../__mocks__/span-installation-export.service';

import { OVSExportByBatchQuery } from './ovs-export-by-batch.query';
import { OVSExportByBatchHandler } from './ovs-export-by-batch.handler';

describe('OVSExportByBatchHandler', () => {
	beforeEach(() => {
		jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('2000-01-01T00:00:00.000Z');
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('executes query', async () => {
		const batchId = 'batchId';
		const query = new OVSExportByBatchQuery(responseMock, batchId);
		await new OVSExportByBatchHandler(mockExporterService, mockAddOvsSheetService, mockLogger).execute(query);

		expect(mockAddOvsSheetService.addOVSRows).toHaveBeenCalledTimes(1);
	});

	it('should return the correct headers for a spreadsheet', async () => {
		const batchId = 'batchId';
		const query = new OVSExportByBatchQuery(responseMock, batchId);

		await new OVSExportByBatchHandler(mockExporterService, mockAddOvsSheetService, mockLogger).execute(query);

		expect(responseMock.setHeader).toHaveBeenCalledWith(
			'Content-Type',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		);
		expect(responseMock.end).toHaveBeenCalled();
	});

	it('should contain the correct fileName in the headers', async () => {
		const batchId = 'batchId';
		const query = new OVSExportByBatchQuery(responseMock, batchId);

		await new OVSExportByBatchHandler(mockExporterService, mockAddOvsSheetService, mockLogger).execute(query);

		const fileName = `OVS-all-export-${new Date().toISOString()}`;
		expect(responseMock.setHeader).toHaveBeenLastCalledWith(
			'Content-Disposition',
			`attachment; filename=${fileName}`,
		);
		expect(responseMock.end).toHaveBeenCalled();
	});
});
