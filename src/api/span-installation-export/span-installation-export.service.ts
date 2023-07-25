import { Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';

@Injectable()
export class SpanInstallationExportService {
	async getDummyData(surveyId: string): Promise<any[]> {
		// Replace this with your actual data retrieval logic using the surveyId parameter
		return [
			{ name: 'John Doe', age: 30, email: 'john@example.com' },
			{ name: 'Jane Smith', age: 25, email: 'jane@example.com' },
			// Add more dummy data here
		];
	}

	async createXLSX(): Promise<ExcelJS.Buffer> {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Dummy Data');

		// Add headers
		worksheet.addRow(['Name', 'Age', 'Email']);

		// Add data rows
		// data.forEach((row) => {
		// 	worksheet.addRow([row.name, row.age, row.email]);
		// });

		return workbook.xlsx.writeBuffer();
	}
}
