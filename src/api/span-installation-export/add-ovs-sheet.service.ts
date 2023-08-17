import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

import { SupportSystemService } from '../../schema/span-installation/support-system.service';
import { SupportSystem } from '../../schema/span-installation/models/support-system.model';
import { BatchService } from '../../schema/batch/batch.service';

import { OVSExportColumn, OVSExportSpanInstallationBaseData } from './types/span-installation';

@Injectable()
export class AddOVSSheetService {
	constructor(
		private readonly batchService: BatchService,
		private readonly supportSystemService: SupportSystemService,
	) {}

	public async getData(ovsAsset: OVSExportSpanInstallationBaseData): Promise<any> {
		const supportSystems = await this.supportSystemService.findByObject(ovsAsset.id);
		console.log(supportSystems);
		const passportData = ovsAsset.attributes;

		// fetch batches from service
		// prep batches in new type with batchNumber and batchStatus
		const batches = await this.batchService.findForAssetThroughSurveys(ovsAsset.id);
		// const batchesData = batches.map((batch) => ({
		// 	batchNumber: batch.name,
		// 	batchStatus: batch.status
		// }));

		const supportSystemFormatted = supportSystems.map((supportSystem) => ({
			...supportSystem,
			street: '--- TODO ---',
			houseNumber: '--- TODO ---',
			floor: '--- TODO ---',
			xCoordinate: '--- TODO ---',
			yCoordinate: '--- TODO ---',
		}));

		return {
			...ovsAsset,
			...passportData,
			batches,
			supportSystems: supportSystemFormatted,
		};
	}

	public async getDataPerSupportSystem(supportSystem: SupportSystem): Promise<any> {
		return {
			supportSystemTypeDetailed: supportSystem.typeDetailed,
			supportSystemStreet: supportSystem.location,
			supportSystemHouseNumber: supportSystem.houseNumber,
			supportSystemFloor: supportSystem.location,
			supportSystemXCoordinate: 'supportSystem.xCoordinate',
			supportSystemYCoordinate: 'supportSystem.yCoordinate',
			supportSystemInstallationHeight: supportSystem.installationHeight,
			supportSystemRemarks: supportSystem.remarks,
		};
	}

	public async addOVSSheet(
		worksheet: ExcelJS.Worksheet,
		ovsAsset: OVSExportSpanInstallationBaseData,
		generateHeaders: boolean,
	) {
		const data = await this.getData(ovsAsset);
		// data is expected to contain the data at root level, where 'key' is the column key

		const baseDataColumns: OVSExportColumn[] = await this.getOVSExportSpanInstallationBaseDataColumns(ovsAsset);
		const batchDataColumns: OVSExportColumn[] = await this.getOVSExportSpanInstallationBatchDataColumns(ovsAsset);
		const passportDataColumns: OVSExportColumn[] = await this.getOVSExportSpanInstallationPassportDataColumns(
			ovsAsset,
		);
		const decompositionFacadeDataColumns: OVSExportColumn[] =
			await this.getOVSExportSpanInstallationDecompositionFacadeDataColumns(ovsAsset);

		const columns: OVSExportColumn[] = [
			...baseDataColumns,
			...batchDataColumns,
			...passportDataColumns,
			...decompositionFacadeDataColumns,
		];
		const headers = columns.map((column) => column.header);

		if (generateHeaders) {
			// Render upper most headers
			this.setDocumentHeaderStyling(worksheet);

			// Render column headers
			const headerRow = worksheet.addRow(headers);
			headerRow.height = 40;

			// Apply header styles
			this.renderHeaderRow(headerRow, columns);
		}

		// Apply specific column styles
		const startingCol = 1;
		columns.forEach((column, columnIdx) => {
			const col = worksheet.getColumn(startingCol + columnIdx);
			col.width = column.width || 12;
		});

		// Loop over all support systems as this is the most deeply nested entity
		data.supportSystems.forEach(async (supportSystem: SupportSystem) => {
			const supportSystemFormatted = await this.getDataPerSupportSystem(supportSystem);
			const rowData = {
				...data,
				...supportSystemFormatted,
			};

			// Apply cell styles
			const newRow = worksheet.addRow([]);
			this.renderColumns(columns, rowData, newRow, startingCol);
		});
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
		// Paspoort
		worksheet.mergeCells('A2', 'K3');
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

		// Decompositie
		worksheet.mergeCells('L2', 'AY2');
		worksheet.getCell('L2').value = 'Decompositie';
		worksheet.getCell('L2').alignment = { vertical: 'middle', horizontal: 'center' };
		worksheet.getCell('L2').font = {
			name: 'Calibri',
			bold: true,
		};
		worksheet.getCell('L2').font = {
			name: 'Calibri',
			bold: true,
		};
		worksheet.getCell('L2').fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FFCEDFF0' },
		};

		return worksheet;
	}

	public async getOVSExportSpanInstallationBaseDataColumns(
		asset: OVSExportSpanInstallationBaseData,
	): Promise<OVSExportColumn[]> {
		return [
			{
				header: 'OVS nummer',
				key: 'code',
				headerStyle: { ...this.headerStyle, italic: true },
				renderCell: (cell: ExcelJS.Cell): void => {
					cell.value = asset.code;
				},
				width: 16,
			},
		];
	}

	public async getOVSExportSpanInstallationBatchDataColumns(
		ovsAsset: OVSExportSpanInstallationBaseData,
	): Promise<OVSExportColumn[]> {
		const batches = await this.batchService.findForAssetThroughSurveys(ovsAsset.id);

		return [
			{
				header: 'Batch nummer(s)',
				key: 'batchNumbers',
				headerStyle: { ...this.headerStyle, italic: true },
				renderCell: (cell: ExcelJS.Cell): void => {
					cell.value = batches.map((batch) => batch.name).join(', ');
				},
				width: 16,
			},
			{
				header: 'Batch status',
				key: 'batchStatus',
				headerStyle: { ...this.headerStyle, italic: true },
				renderCell: (cell: ExcelJS.Cell): void => {
					cell.value = batches[0]?.status || ''; // Handle the case of no batches
				},
				width: 16,
			},
		];
	}

	public async getOVSExportSpanInstallationPassportDataColumns(
		ovsAsset: OVSExportSpanInstallationBaseData,
	): Promise<OVSExportColumn[]> {
		return [
			{
				header: 'Straat',
				key: 'passportStreet',
				headerStyle: { ...this.headerStyle, italic: true },
				renderCell: (cell: ExcelJS.Cell): void => {
					cell.value = ovsAsset.attributes.passportStreet;
				},
				width: 16,
			},
			{
				header: 'Buurt',
				key: 'passportNeighborhood',
				headerStyle: { ...this.headerStyle, italic: true },
				renderCell: (cell: ExcelJS.Cell): void => {
					cell.value = ovsAsset.attributes.passportNeighborhood;
				},
				width: 16,
			},
			{
				header: 'Wijk',
				key: 'passportDistrict',
				headerStyle: { ...this.headerStyle, italic: true },
				renderCell: (cell: ExcelJS.Cell): void => {
					cell.value = ovsAsset.attributes.passportDistrict;
				},
				width: 16,
			},
			{
				header: 'Stadsdeel',
				key: 'passportCityArea',
				headerStyle: { ...this.headerStyle, italic: true },
				renderCell: (cell: ExcelJS.Cell): void => {
					cell.value = ovsAsset.attributes.passportCityArea;
				},
				width: 16,
			},
			{
				header: 'Splitsingen',
				key: 'passportSplits',
				headerStyle: { ...this.headerStyle, italic: true },
				renderCell: (cell: ExcelJS.Cell): void => {
					cell.value = ovsAsset.attributes.passportSplits;
				},
				width: 16,
			},
			{
				header: 'Dubbeldraads',
				key: 'passportDoubleWired',
				headerStyle: { ...this.headerStyle, italic: true },
				renderCell: (cell: ExcelJS.Cell): void => {
					cell.value = ovsAsset.attributes.passportDoubleWired;
				},
				width: 16,
			},
			{
				header: 'Boven trambaan',
				key: 'tramTracks',
				headerStyle: { ...this.headerStyle, italic: true },
				renderCell: (cell: ExcelJS.Cell): void => {
					cell.value = ovsAsset.attributes.tramTracks;
				},
				width: 16,
			},
			{
				header: 'Opmerkingen',
				key: 'notes',
				headerStyle: { ...this.headerStyle, italic: true },
				renderCell: (cell: ExcelJS.Cell): void => {
					cell.value = ovsAsset.attributes.notes;
				},
				width: 16,
			},
		];
	}

	public async getOVSExportSpanInstallationDecompositionFacadeDataColumns(
		ovsAsset: OVSExportSpanInstallationBaseData,
	): Promise<OVSExportColumn[]> {
		return [
			{
				header: 'Type gedetailleerd',
				key: 'supportSystemTypeDetailed',
				headerStyle: { ...this.headerStyle },
				renderCell: (cell: ExcelJS.Cell): void => {
					cell.value = cell.value ? cell.value : '';
				},
				width: 16,
			},
			{
				header: 'Straat',
				key: 'supportSystemStreet',
				headerStyle: { ...this.headerStyle },
				renderCell: (cell: ExcelJS.Cell): void => {
					cell.value = cell.value ? cell.value : '';
				},
				width: 16,
			},
			{
				header: 'Huisnummer',
				key: 'supportSystemHouseNumber',
				headerStyle: { ...this.headerStyle },
				renderCell: (cell: ExcelJS.Cell): void => {
					cell.value = cell.value ? cell.value : '';
				},
				width: 16,
			},
			{
				header: 'Verdieping',
				key: 'supportSystemFloor',
				headerStyle: { ...this.headerStyle },
				renderCell: (cell: ExcelJS.Cell): void => {
					cell.value = cell.value ? cell.value : '';
				},
				width: 16,
			},
			{
				header: 'X coordinaat',
				key: 'supportSystemXCoordinate',
				headerStyle: { ...this.headerStyle },
				renderCell: (cell: ExcelJS.Cell): void => {
					cell.value = '--- TODO ---';
				},
				width: 16,
			},
			{
				header: 'Y coordinaat',
				key: 'supportSystemYCoordinate',
				headerStyle: { ...this.headerStyle },
				renderCell: (cell: ExcelJS.Cell): void => {
					cell.value = '--- TODO ---';
				},
				width: 16,
			},
			{
				header: 'Aanleghoogte',
				key: 'supportSystemInstallationHeight',
				headerStyle: { ...this.headerStyle },
				renderCell: (cell: ExcelJS.Cell): void => {
					cell.value = cell.value ? cell.value : '';
				},
				width: 16,
			},
			{
				header: 'Opmerkingen',
				key: 'supportSystemRemarks',
				headerStyle: { ...this.headerStyle },
				renderCell: (cell: ExcelJS.Cell): void => {
					cell.value = cell.value ? cell.value : '';
				},
				width: 16,
			},
		];
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
