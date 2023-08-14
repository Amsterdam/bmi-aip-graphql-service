import { MockedObjectDeep } from 'ts-jest';
import ExcelJS from 'exceljs';

import { SpanInstallationExportService } from '../span-installation-export.service';

import { OVSExportAllHandler } from './ovs-export-all.handler';
import { OVSExportAllQuery } from './ovs-export-all.query';

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Mock');
worksheet.addRow([]);

const exporterServiceMock: MockedObjectDeep<SpanInstallationExportService> = {
	createXLSX: jest.fn().mockReturnValue(workbook.xlsx.writeBuffer()),
	getDummyData: jest.fn().mockReturnValue([]),
	exportAll: jest.fn().mockReturnValue(workbook.xlsx.writeBuffer()),
	...(<any>{}),
};

describe('OVSExportAllHandler', () => {
	const fixedDate = new Date('2023-07-19T12:34:56.789Z');
	const realDate = Date;
	let handler: OVSExportAllHandler;

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
		handler = new OVSExportAllHandler(exporterServiceMock);
	});

	it('should return the XLSX buffer', async () => {
		const result = await handler.execute(new OVSExportAllQuery());
		expect(Buffer.isBuffer(result.xlsxBuffer)).toBe(true);
	});

	it('should return the fileName', async () => {
		const result = await handler.execute(new OVSExportAllQuery());
		expect(result.fileName).toBe('OVS-batch-export-2023-07-19T12:34:56.789Z');
	});
});
