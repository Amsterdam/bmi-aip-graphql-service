import { MockedObjectDeep } from 'ts-jest';
import ExcelJS from 'exceljs';

import { SpanInstallationExportService } from '../span-installation-export.service';

import { OVSExportByBatchHandler } from './ovs-export-by-batch.handler';
import { OVSExportByObjectQuery } from './ovs-export-by-object.query';

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Mock');
worksheet.addRow([]);

const exporterServiceMock: MockedObjectDeep<SpanInstallationExportService> = {
	// @ts-ignore
	createXLSX: jest.fn().mockReturnValue(workbook.xlsx.writeBuffer()),
	getDummyData: jest.fn().mockReturnValue([]),
	exportByBatch: jest.fn().mockReturnValue(workbook.xlsx.writeBuffer()),
	...(<any>{}),
};

describe('OVSExportByObjectQuery', () => {
	const fixedDate = new Date('2023-07-19T12:34:56.789Z');
	const realDate = Date;
	let handler: OVSExportByBatchHandler;

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
		handler = new OVSExportByObjectQuery(exporterServiceMock);
	});

	it('should return the XLSX buffer', async () => {
		const result = await handler.execute(new OVSExportByObjectQuery('__object_id__'));
		expect(Buffer.isBuffer(result.xlsxBuffer)).toBe(true);
	});

	it('should return the fileName', async () => {
		const result = await handler.execute(new OVSExportByObjectQuery('__object_id__'));
		expect(result.fileName).toBe('OVS-export-2023-07-19T12:34:56.789Z');
	});
});
