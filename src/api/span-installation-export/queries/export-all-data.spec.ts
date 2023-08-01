import { MockedObjectDeep } from 'ts-jest';
import ExcelJS from 'exceljs';

import { SpanInstallationExportService } from '../span-installation-export.service';

import { ExportAllDataHandler } from './export-all-data.handler';
import { ExportAllDataQuery } from './export-all-data.query';

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Mock');
worksheet.addRow([]);

const exporterServiceMock: MockedObjectDeep<SpanInstallationExportService> = {
	// @ts-ignore
	createXLSX: jest.fn().mockReturnValue(workbook.xlsx.writeBuffer()),
	getDummyData: jest.fn().mockReturnValue([]),
	exportAll: jest.fn().mockReturnValue(workbook.xlsx.writeBuffer()),
	...(<any>{}),
};

describe('ExportAllDataHandler', () => {
	const fixedDate = new Date('2023-07-19T12:34:56.789Z');
	const realDate = Date;
	let handler: ExportAllDataHandler;

	beforeAll(() => {
		global.Date = class extends Date {
			constructor() {
				super();
				return fixedDate;
			}
		} as DateConstructor;
	});

	afterAll(() => {
		global.Date = realDate;
	});

	beforeEach(() => {
		exporterServiceMock.createXLSX.mockClear();
		handler = new ExportAllDataHandler(exporterServiceMock);
	});

	it('should return the XLSX buffer', async () => {
		const result = await handler.execute(new ExportAllDataQuery());
		expect(Buffer.isBuffer(result.xlsxBuffer)).toBe(true);
	});

	it('should return the fileName', async () => {
		const result = await handler.execute(new ExportAllDataQuery());
		expect(result.fileName).toBe('OVS-batch-export-2023-07-19T12:34:56.789Z');
	});
});
