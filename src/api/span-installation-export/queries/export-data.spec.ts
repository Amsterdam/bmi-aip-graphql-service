import { MockedObjectDeep } from 'ts-jest';
import ExcelJS from 'exceljs';

import { SpanInstallationExportService } from '../span-installation-export.service';

import { ExportDataHandler } from './export-data.handler';
import { ExportDataQuery } from './export-data.query';

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Mock');
worksheet.addRow([]);

const exporterServiceMock: MockedObjectDeep<SpanInstallationExportService> = {
	// @ts-ignore
	createXLSX: jest.fn().mockReturnValue(workbook.xlsx.writeBuffer()),
	getDummyData: jest.fn().mockReturnValue([]),
	...(<any>{}),
};

describe('ExportDataHandler', () => {
	const fixedDate = new Date('2023-07-19T12:34:56.789Z');
	const realDate = Date;
	let handler: ExportDataHandler;

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
		// exporterServiceMock.getDummyData.mockClear();
		exporterServiceMock.createXLSX.mockClear();
		handler = new ExportDataHandler(exporterServiceMock);
	});

	it('should return the XLSX buffer', async () => {
		const result = await handler.execute(new ExportDataQuery());
		expect(Buffer.isBuffer(result.xlsxBuffer)).toBe(true);
	});

	it('should return the fileName', async () => {
		const result = await handler.execute(new ExportDataQuery());
		expect(result.fileName).toBe('OVS-export-2023-07-19T12:34:56.789Z');
	});
});
