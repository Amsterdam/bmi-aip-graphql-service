import ExcelJS from 'exceljs';

const workbook: ExcelJS.Workbook = new ExcelJS.Workbook();
const worksheet: ExcelJS.Worksheet = workbook.addWorksheet('Mock');
worksheet.addRow([]);

export const SpanInstallationExportService = jest.fn(() => ({
	createXLSXForBatch: jest.fn(() => (workbook.xlsx as ExcelJS.Xlsx).writeBuffer()),
}));
