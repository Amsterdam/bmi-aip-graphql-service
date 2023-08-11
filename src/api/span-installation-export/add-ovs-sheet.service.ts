import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

import { OVSExportColumn, OVSExportSpanInstallationBaseData } from './types/span-installation';

@Injectable()
export class AddOVSSheetService {
	public async addOVSSheet(
		worksheet: ExcelJS.Worksheet,
		ovsAsset: OVSExportSpanInstallationBaseData,
		generateHeaders: boolean,
	) {
		const baseDataColumns: OVSExportColumn[] = await this.getOVSExportSpanInstallationBaseDataColumns(ovsAsset);
		// actually redundant, but for the sake of clarity

		const columns: OVSExportColumn[] = [...baseDataColumns];
		const headers = columns.map((column) => column.header);

		if (generateHeaders) {
			// Render upper most headers
			this.setDocumentHeaderStyling(worksheet);

			// Render column headers
			const headerRow = worksheet.addRow(headers);
			headerRow.height = 40;
			this.renderHeaderRow(headerRow, columns); // Apply header styles
		}

		// Apply specific column styles
		const startingCol = 1;
		columns.forEach((column, columnIdx) => {
			const col = worksheet.getColumn(startingCol + columnIdx);
			col.width = column.width || 12;
		});

		const rowData = {
			...ovsAsset,
		};

		const newRow = worksheet.addRow([]);
		this.renderColumns(columns, rowData, newRow, startingCol); // Apply cell styles
	}

	public async setDocumentHeaderStyling(worksheet: ExcelJS.Worksheet): Promise<ExcelJS.Worksheet> {
		// Add upper most heading (Contracts)
		worksheet.mergeCells('A1', 'P1');
		worksheet.getCell('A1').value = 'Contract - 1';
		worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
		worksheet.getCell('A1').fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FF416289' },
		};

		// Add second rows of heading (Categories)
		worksheet.mergeCells('A2', 'P3');
		worksheet.getCell('A2').value = 'Paspoort';
		worksheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' };
		worksheet.getCell('A2').font = {
			name: 'Calibri',
			bold: true,
		};
		worksheet.getCell('A2').font = {
			name: 'Calibri',
			bold: true,
		};
		worksheet.getCell('A2').fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FFCEDFF0' },
		};

		return worksheet;
	}

	private async getOVSExportSpanInstallationBaseDataColumns(
		asset: OVSExportSpanInstallationBaseData,
	): Promise<OVSExportColumn[]> {
		return new Promise((resolve) => {
			const columns: OVSExportColumn[] = [
				{
					header: 'ID',
					key: 'id',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: ExcelJS.Cell): void => {
						cell.value = asset.id;
					},
					width: 16,
				},
				{
					header: 'Name',
					key: 'name',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: ExcelJS.Cell): void => {
						cell.value = asset.name;
					},
					width: 16,
				},
				{
					header: 'Code',
					key: 'code',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: ExcelJS.Cell): void => {
						cell.value = asset.code;
					},
					width: 16,
				},
				{
					header: 'Location',
					key: 'location',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: ExcelJS.Cell): void => {
						cell.value = asset.location;
					},
					width: 16,
				},
				{
					header: 'Latitude',
					key: 'latitude',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: ExcelJS.Cell): void => {
						cell.value = '' + asset.latitude;
					},
					width: 16,
				},
				{
					header: 'Longitude',
					key: 'longitude',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: ExcelJS.Cell): void => {
						cell.value = '' + asset.longitude;
					},
					width: 16,
				},
				{
					header: 'attributes',
					key: 'attributes',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: ExcelJS.Cell): void => {
						cell.value = '';
					},
					width: 16,
				},
			];
			resolve(columns);
		});
	}

	private renderColumns(columns: OVSExportColumn[], data: any, row: ExcelJS.Row, startingCol: number): void {
		columns.forEach((column: OVSExportColumn, columnIdx: number) => {
			const cell: ExcelJS.Cell = row.getCell(startingCol + columnIdx);
			column.renderCell(cell, data[column.key], row.number, cell.col);

			// Set the column width if specified
			if (column.width) {
				const col = row.worksheet.getColumn(startingCol + columnIdx);
				col.width = column.width;
			}
		});
	}

	private headerStyle = {
		bgColor: 'dfdfdf',
		textColor: '000000',
	};

	private renderHeaderRow(row: ExcelJS.Row, columns: OVSExportColumn[]): void {
		row.eachCell((cell, colNumber) => {
			const column = columns[colNumber - 1];
			this.renderHeader(cell, column);
		});
	}

	private renderHeader(cell: ExcelJS.Cell, column: OVSExportColumn) {
		cell.value = column?.header;

		if (column?.headerStyle) {
			const {
				bgColor,
				textColor,
				bold = true,
				italic = false,
				underline = false,
				strike = false,
			} = column.headerStyle;
			cell.style = {
				fill: {
					type: 'pattern',
					pattern: 'solid',
					fgColor: {
						argb: bgColor || 'FFFFFF', // Use a default color if bgColor is undefined
					},
					bgColor: {
						argb: bgColor || 'FFFFFF', // Use a default color if bgColor is undefined
					},
				},
				font: {
					name: 'Calibri',
					size: 12,
					color: { argb: textColor || '000000' },
					bold,
					italic,
					underline,
					strike,
				},
			};
		}
	}
}
