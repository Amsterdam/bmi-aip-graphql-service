import { MockedObjectDeep } from 'ts-jest';
import { Logger } from '@nestjs/common';

import { responseMock } from '../__mocks__/response';
import { SpanInstallationExportService } from '../span-installation-export.service';
import { AddOVSSheetService } from '../add-ovs-sheet.service';
import { ovsAssetStub } from '../__stubs__/ovs-asset';

import { OVSExportByObjectHandler } from './ovs-export-by-object.handler';
import { OVSExportByObjectQuery } from './ovs-export-by-object.query';

const mockExporterService: MockedObjectDeep<SpanInstallationExportService> = {
	getObjectById: jest.fn().mockResolvedValue([ovsAssetStub]),
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

describe('OVSExportByObjectHandler', () => {
	test('executes query', async () => {
		const batchId = 'batchId';
		const query = new OVSExportByObjectQuery(responseMock, batchId);
		await new OVSExportByObjectHandler(mockExporterService, mockAddOvsSheetService, mockLogger).execute(query);

		expect(mockAddOvsSheetService.addOVSSheet).toHaveBeenCalledTimes(1);
	});
});
