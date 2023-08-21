import { MockedObjectDeep } from 'ts-jest';
import { Logger } from '@nestjs/common';

import { responseMock } from '../__mocks__/response';
import { SpanInstallationExportService } from '../span-installation-export.service';
import { OVSSheetService } from '../ovs-sheet.service';
import { ovsAssetStub } from '../__stubs__/ovs-asset';

import { OVSExportByObjectHandler } from './ovs-export-by-object.handler';
import { OVSExportByObjectQuery } from './ovs-export-by-object.query';

const mockExporterService: MockedObjectDeep<SpanInstallationExportService> = {
	getObjectById: jest.fn().mockResolvedValue([ovsAssetStub]),
	...(<any>{}),
};

const mockAddOvsSheetService: MockedObjectDeep<OVSSheetService> = {
	addOVSRows: jest.fn().mockResolvedValue({}),
	...(<any>{}),
};

const mockLogger: MockedObjectDeep<Logger> = {
	...(<any>{
		log: jest.fn(),
		error: jest.fn(),
	}),
};

describe('OVSExportByObjectHandler', () => {
	beforeEach(() => {
		jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('2000-01-01T00:00:00.000Z');
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('executes query', async () => {
		const objectId = 'objectId';
		const query = new OVSExportByObjectQuery(responseMock, objectId);
		await new OVSExportByObjectHandler(mockExporterService, mockAddOvsSheetService, mockLogger).execute(query);

		expect(mockAddOvsSheetService.addOVSRows).toHaveBeenCalledTimes(1);
	});

	it('should return the correct headers for a spreadsheet', async () => {
		const objectId = 'objectId';
		const query = new OVSExportByObjectQuery(responseMock, objectId);

		await new OVSExportByObjectHandler(mockExporterService, mockAddOvsSheetService, mockLogger).execute(query);

		expect(responseMock.setHeader).toHaveBeenCalledWith(
			'Content-Type',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		);
		expect(responseMock.end).toHaveBeenCalled();
	});

	it('should contain the correct fileName in the headers', async () => {
		const objectId = 'objectId';
		const query = new OVSExportByObjectQuery(responseMock, objectId);

		await new OVSExportByObjectHandler(mockExporterService, mockAddOvsSheetService, mockLogger).execute(query);

		const fileName = `OVS-object-export-${new Date().toISOString()}`;
		expect(responseMock.setHeader).toHaveBeenLastCalledWith(
			'Content-Disposition',
			`attachment; filename=${fileName}`,
		);
		expect(responseMock.end).toHaveBeenCalled();
	});
});
