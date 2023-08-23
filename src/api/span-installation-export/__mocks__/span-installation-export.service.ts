import { Logger } from '@nestjs/common';
import ExcelJS from 'exceljs';
import { MockedObjectDeep } from 'ts-jest';

import { ovsAssetStub } from '../__stubs__/ovs-asset';
import { OVSSheetService } from '../ovs-sheet.service';
import { SpanInstallationExportService } from '../span-installation-export.service';

const workbook: ExcelJS.Workbook = new ExcelJS.Workbook();
const worksheet: ExcelJS.Worksheet = workbook.addWorksheet('Mock');
worksheet.addRow([]);

export const spanInstallationExportService = jest.fn(() => ({
	createXLSXForBatch: jest.fn(() => (workbook.xlsx as ExcelJS.Xlsx).writeBuffer()),
}));

export const mockExporterService: MockedObjectDeep<SpanInstallationExportService> = {
	getObjectsInBatch: jest.fn().mockResolvedValue([ovsAssetStub]),
	getObjectById: jest.fn().mockResolvedValue([ovsAssetStub]),
	getObjectsInAllBatches: jest.fn().mockResolvedValue([ovsAssetStub]),
	...(<any>{}),
};

export const mockAddOvsSheetService: MockedObjectDeep<OVSSheetService> = {
	addOVSRows: jest.fn().mockResolvedValue({}),
	...(<any>{}),
};

export const mockLogger: MockedObjectDeep<Logger> = {
	...(<any>{
		log: jest.fn(),
		error: jest.fn(),
	}),
};
