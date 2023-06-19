import { Injectable } from '@nestjs/common';
import { Cell, Row, Style, Worksheet } from 'exceljs';

import { Survey } from '../survey/models/survey.model';

import { MjopExportColumn } from './types/mjop-export-column';
import { infrastrutureTypeList } from './utils/infrastruture-type-list';
import { mainMaterialList } from './utils/main-material-list';
import { MJOPColumnHeaderKeys, MJOPRecord } from './types/mjop-record';
import { MJOPDataService } from './mjop-data.service';
import { getMeasureTypeLabel } from './utils/measure';
import { IMJOPUnit } from './types/mjop-unit';
import { IMJOPMeasure } from './types/mjop-measure';
import { IMJOPElement } from './types/mjop-element';

@Injectable()
export class AddMJOPSheetService {
	public constructor(private readonly getMjopDataService: MJOPDataService) {}

	public async addMJOPSheet(worksheet: Worksheet, survey: Survey, isFmeca: boolean, generateHeaders: boolean) {
		const data: Partial<MJOPRecord> = await this.getMjopDataService.getMJOPData(survey);

		const assetColumns: MjopExportColumn[] = await this.getAssetColumns(data, survey.id);
		const surveyColumns: MjopExportColumn[] = await this.getSurveyColumns();
		const elementColumns: MjopExportColumn[] = await this.getElementColumns();
		const derivedConditionScoreElementColumns: MjopExportColumn[] =
			await this.getDerivedConditionScoreElementColumns();
		const unitColumns: MjopExportColumn[] = await this.getUnitColumns();
		const derivedConditionScoreUnitColumns: MjopExportColumn[] = await this.getDerivedConditionScoreUnitColumns();
		let failureModeColumns: MjopExportColumn[] = [];
		let defectColumns: MjopExportColumn[] = [];
		let conditionColumns: MjopExportColumn[] = [];
		if (isFmeca) {
			failureModeColumns = await this.getFailureModeColumns();
			conditionColumns = await this.getConditionColumns();
		} else {
			defectColumns = await this.getDefectColumns();
		}
		const measureColumns: MjopExportColumn[] = await this.getMeasureColumns();
		const cyclicMaintenanceColumns: MjopExportColumn[] = this.getCyclicMaintenanceColumns();

		const columns: MjopExportColumn[] = [
			...assetColumns,
			...surveyColumns,
			...elementColumns,
			...derivedConditionScoreElementColumns,
			...unitColumns,
			...failureModeColumns,
			...derivedConditionScoreUnitColumns,
			...defectColumns,
			...conditionColumns,
			...measureColumns,
			...cyclicMaintenanceColumns,
		];

		const headers = columns.map((column) => column.header);
		if (generateHeaders) {
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

		const asset = data.asset;
		data.survey.elements?.forEach((element: IMJOPElement) => {
			element.units?.forEach((unit: IMJOPUnit) => {
				unit.measures?.forEach((measure: IMJOPMeasure) => {
					let failureMode;
					let defect;
					if (isFmeca) {
						failureMode = measure.failureMode;
					} else {
						defect = measure.defect;
					}

					const rowData = {
						...asset,
						...data.survey,
						...element,
						...element.derivedConditionScoreElement,
						...unit,
						...failureMode,
						...unit.derivedConditionScoreUnit,
						...defect,
						...measure,
						...measure.cyclicMaintenance,
					};

					const newRow = worksheet.addRow([]);
					this.renderColumns(columns, rowData, newRow, startingCol); // Apply cell styles
				});
			});
		});
	}

	private getCyclicMaintenanceColumns(): MjopExportColumn[] {
		const columns: MjopExportColumn[] = [];
		const headers: string[] = [];
		const yearNumber = new Date().getFullYear();

		for (let i = 0; i <= 20; i++) {
			const yearColumn = yearNumber + i;
			const yearColumnName = `year${yearColumn.toString()}`;

			const item: MjopExportColumn = {
				headerStyle: { ...this.headerStyle, italic: true, bgColor: '4c4a49', textColor: 'ffffff' },
				key: yearColumnName as MJOPColumnHeaderKeys,
				renderCell: (cell: Cell, value): void => {
					cell.value = value;
					cell.style = { numFmt: '"€"#,##0.00;' };
				},
				header: String(yearColumn),
			};

			headers.push(String(yearColumn));
			columns.push(item);
		}

		return columns;
	}

	private async getAssetColumns(data: Partial<MJOPRecord>, surveyId: string): Promise<MjopExportColumn[]> {
		// Update asset properties if necessary
		const asset = data.asset;
		if (asset.marineInfrastrutureType) {
			const infrastructure = infrastrutureTypeList.find(
				(infrastructureItem) => infrastructureItem.value === asset.marineInfrastrutureType,
			);
			asset.marineInfrastrutureType = infrastructure && infrastructure.text;
		}
		if (asset.mainMaterial) {
			const material = mainMaterialList.find((materialItem) => materialItem.value === asset.mainMaterial);
			asset.mainMaterial = material && material.text;
		}
		return new Promise((resolve) => {
			const columns: MjopExportColumn[] = [
				{
					header: 'Objectnr',
					key: 'code',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell): void => {
						cell.value = { text: asset.code, hyperlink: 'https://aip.amsterdam.nl/surveys/' + surveyId };
						cell.font = { underline: 'single', bold: true };
					},
					width: 16,
				},
				{
					header: 'Name',
					key: 'assetName',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell): void => {
						cell.value = asset.assetName;
					},
					width: 16,
				},
				{
					header: 'Type object',
					key: 'marineInfrastrutureType',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell): void => {
						cell.value = asset.marineInfrastrutureType;
					},
					width: 16,
				},
				{
					header: 'Materiaal',
					key: 'mainMaterial',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell): void => {
						cell.value = asset.mainMaterial;
					},
					width: 20,
				},
			];
			resolve(columns);
		});
	}

	private async getSurveyColumns(): Promise<MjopExportColumn[]> {
		return [
			{
				header: 'Conditiescore Object',
				key: 'condition',
				headerStyle: { ...this.headerStyle, italic: true },
				renderCell: (cell: Cell, value): void => {
					cell.style = value ? this.getRisicoScoreCellStyle(cell, value) : {};
					cell.value = value;
					cell.alignment = { horizontal: 'center' };
				},
				width: 16,
			},
			{
				header: 'Verzorgingsscore Object',
				key: 'careScore',
				headerStyle: { ...this.headerStyle, italic: true },
				renderCell: (cell: Cell, value): void => {
					cell.style = value ? this.getRisicoScoreCellStyle(cell, value) : {};
					cell.value = value;
					cell.alignment = { horizontal: 'center' };
				},
				width: 18,
			},
		];
	}

	private getElementColumns(): Promise<MjopExportColumn[]> {
		return new Promise((resolve) => {
			const columns: MjopExportColumn[] = [
				{
					key: 'elementName',
					header: 'Element',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 36,
				},
			];
			resolve(columns);
		});
	}

	private getDerivedConditionScoreElementColumns(): Promise<MjopExportColumn[]> {
		return new Promise((resolve) => {
			const columns: MjopExportColumn[] = [
				{
					header: 'Conditiescore Element',
					key: 'elementCondition',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.style = value ? this.getRisicoScoreCellStyle(cell, value) : {};
						cell.value = value;
						cell.alignment = { horizontal: 'center' };
					},
					width: 16,
				},
				{
					header: 'Verzorgingsscore Element',
					key: 'elementCare',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.style = value ? this.getRisicoScoreCellStyle(cell, value) : {};
						cell.value = value;
						cell.alignment = { horizontal: 'center' };
					},
					width: 16,
				},
			];
			resolve(columns);
		});
	}

	private getDerivedConditionScoreUnitColumns(): Promise<MjopExportColumn[]> {
		return new Promise((resolve) => {
			const columns: MjopExportColumn[] = [
				{
					header: 'Conditiescore Bouwdeel',
					key: 'unitCondition',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.style = value ? this.getRisicoScoreCellStyle(cell, value) : {};
						cell.value = value;
						cell.alignment = { horizontal: 'center' };
					},
					width: 16,
				},
				{
					header: 'Verzorgingsscore Bouwdeel',
					key: 'unitCare',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.style = value ? this.getRisicoScoreCellStyle(cell, value) : {};
						cell.value = value;
						cell.alignment = { horizontal: 'center' };
					},
					width: 16,
				},
			];
			resolve(columns);
		});
	}

	private getUnitColumns(): Promise<MjopExportColumn[]> {
		return new Promise((resolve) => {
			const columns: MjopExportColumn[] = [
				{
					header: 'Bouwdeel',
					key: 'unitName',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 35,
				},
				{
					header: 'Materiaal',
					key: 'unitMaterial',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 12,
				},
				{
					header: 'Hoeveelheid',
					key: 'quantity',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 12,
				},
				{
					header: 'Eenheid',
					key: 'quantityUnitOfMeasurement',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value === 'pcs' ? 'st' : value; // Update the value if it is 'pcs'
					},
					width: 12,
				},
			];
			resolve(columns);
		});
	}

	private getDefectColumns(): Promise<MjopExportColumn[]> {
		return new Promise((resolve) => {
			const columns: MjopExportColumn[] = [
				{
					header: 'Schadebeeld',
					key: 'defectName',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 20,
				},
				{
					header: 'Herstel advies',
					key: 'repairAdvice',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 40,
				},
				{
					header: 'Conditiescore Gebrek',
					key: 'defectScore',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.style = value ? this.getRisicoScoreCellStyle(cell, value) : {};
						cell.value = value;
						cell.alignment = { horizontal: 'center' };
					},
					width: 20,
				},
				{
					header: 'Verzorgingsscore Gebrek',
					key: 'defectCareScore',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.style = value ? this.getRisicoScoreCellStyle(cell, value) : {};
						cell.value = value;
						cell.alignment = { horizontal: 'center' };
					},
					width: 20,
				},
				{
					header: 'R',
					key: 'ramsR',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.style = value ? this.getRisicoScoreCellStyle(cell, value) : {};
						cell.value = value;
						cell.alignment = { horizontal: 'center' };
					},
					width: 4,
				},
				{
					header: 'A',
					key: 'ramsA',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.style = value ? this.getRisicoScoreCellStyle(cell, value) : {};
						cell.value = value;
						cell.alignment = { horizontal: 'center' };
					},
					width: 4,
				},
				{
					header: 'S',
					key: 'ramsS',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.style = value ? this.getRisicoScoreCellStyle(cell, value) : {};
						cell.value = value;
						cell.alignment = { horizontal: 'center' };
					},
					width: 4,
				},
				{
					header: 'Ec',
					key: 'ramsEc',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.style = value ? this.getRisicoScoreCellStyle(cell, value) : {};
						cell.value = value;
						cell.alignment = { horizontal: 'center' };
					},
					width: 4,
				},
				{
					header: 'Env',
					key: 'ramsEnv',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.style = value ? this.getRisicoScoreCellStyle(cell, value) : {};
						cell.value = value;
						cell.alignment = { horizontal: 'center' };
					},
					width: 4,
				},
				{
					header: 'Prioritering',
					key: 'ramsTotalPriority',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = this.getRamsPriority(value);
						cell.alignment = { horizontal: 'center' };
					},
					width: 18,
				},
			];
			resolve(columns);
		});
	}

	private getFailureModeColumns(): Promise<MjopExportColumn[]> {
		return new Promise((resolve) => {
			const columns: MjopExportColumn[] = [
				{
					header: 'Faalwijze',
					key: 'failureModeName',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 35,
				},
				{
					header: 'Faaloorzaak',
					key: 'faaloorzaak',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 35,
				},
				{
					header: 'Bron van falen',
					key: 'bronVanFalen',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 35,
				},
				{
					header: 'Gevolg van falen',
					key: 'gevolgVanFalen',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 35,
				},
				{
					header: 'Bureaustudie',
					key: 'analysisRemarks',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 35,
				},
				{
					header: 'Verificatie',
					key: 'verificationRemarks',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 35,
				},
				{
					header: 'Onderhoud',
					key: 'maintenanceRemarks',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 35,
				},
				{
					header: 'R',
					key: 'verificationRamsR',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 4,
				},
				{
					header: 'A',
					key: 'verificationRamsA',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 4,
				},
				{
					header: 'S',
					key: 'verificationRamsS',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 4,
				},
				{
					header: 'C',
					key: 'verificationRamsC',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 4,
				},
				{
					header: 'Env',
					key: 'verificationRamsEnv',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 4,
				},
				{
					header: 'Ec',
					key: 'verificationRamsEc',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 4,
				},
				{
					header: 'P',
					key: 'verificationRamsP',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 4,
				},
				{
					header: 'Prioritering',
					key: 'verificationRamsWeightedPriority',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 16,
				},
			];
			resolve(columns);
		});
	}

	private async getConditionColumns(): Promise<MjopExportColumn[]> {
		return new Promise((resolve) => {
			const columns: MjopExportColumn[] = [
				{
					header: 'Conditiescore Object',
					key: 'craInspectionScore',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = this.getConditionScore(value);
					},
					width: 50,
				},
			];
			resolve(columns);
		});
	}

	private getConditionScore(value) {
		switch (value) {
			case '1':
				return 'Laag risico';
			case '2':
				return 'Ondergemiddeld risico';
			case '3':
				return 'Bovengemiddeld risico';
			case '4':
				return 'Hoog risico';
			default:
				return 'Onbepaald';
		}
	}

	private getMeasureColumns(): Promise<MjopExportColumn[]> {
		return new Promise((resolve) => {
			const columns: MjopExportColumn[] = [
				{
					header: 'Maatregel',
					key: 'maintenanceDescription',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
					},
					width: 40,
				},
				{
					header: 'Type onderhoud',
					key: 'maintenanceType',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = getMeasureTypeLabel(value);
					},
					width: 20,
				},
				{
					header: 'Cyclus',
					key: 'maintenanceCycle',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
						cell.alignment = { horizontal: 'right' };
					},
					width: 8,
				},
				{
					header: 'Eenheidsprijs',
					key: 'maintenanceUnitPrice',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
						cell.alignment = { horizontal: 'right' };
						cell.style = { numFmt: '"€"#,##0.00;' };
					},
					width: 8,
				},
				{
					header: 'Toeslag',
					key: 'maintenanceCostSurcharge',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
						cell.alignment = { horizontal: 'right' };
					},
					width: 8,
				},
				{
					header: 'Totale kosten',
					key: 'totalCost',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
						cell.alignment = { horizontal: 'right' };
						cell.style = { numFmt: '"€"#,##0.00;' };
					},
					width: 16,
				},
				{
					header: 'Totale kosten incl.toeslagen',
					key: 'totalCostWithSurcharge',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
						cell.alignment = { horizontal: 'right' };
						cell.style = { numFmt: '"€"#,##0.00;' };
					},
					width: 16,
				},
				{
					header: 'Planjaar',
					key: 'maintenanceYear',
					headerStyle: { ...this.headerStyle, italic: true },
					renderCell: (cell: Cell, value): void => {
						cell.value = value;
						cell.alignment = { horizontal: 'right' };
					},
					width: 12,
				},
			];
			resolve(columns);
		});
	}

	private renderColumns(columns: MjopExportColumn[], data: any, row: Row, startingCol: number): void {
		columns.forEach((column: MjopExportColumn, columnIdx: number) => {
			const cell: Cell = row.getCell(startingCol + columnIdx);
			column.renderCell(cell, data[column.key], row.number, cell.col);

			// Set the column width if specified
			if (column.width) {
				const col = row.worksheet.getColumn(startingCol + columnIdx);
				col.width = column.width;
			}
		});
	}

	private headerStyle = {
		bgColor: 'e93323',
		textColor: 'ffffff',
	};

	private renderHeaderRow(row: Row, columns: MjopExportColumn[]): void {
		row.eachCell((cell, colNumber) => {
			const column = columns[colNumber - 1];
			this.renderHeader(cell, column);
		});
	}

	private renderHeader(cell: Cell, column: MjopExportColumn) {
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
						argb: bgColor || 'FFFFFFFF', // Use a default color if bgColor is undefined
					},
					bgColor: {
						argb: bgColor || 'FFFFFFFF', // Use a default color if bgColor is undefined
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

		cell.alignment = {
			horizontal: 'center',
			vertical: 'middle',
			wrapText: true,
		};
	}

	private getPriorityColor(priority) {
		switch (priority) {
			case '1':
				return '267b45';
			case '2':
				return '5ec54b';
			case '3':
				return 'f4b027';
			case '4':
				return 'fd9408';
			case '5':
				return 'fd7808';
			case '6':
				return 'd73f2d';
			default:
				return '';
		}
	}

	private getRisicoScoreCellStyle = (cell: Cell, value: string): Partial<Style> => ({
		fill: {
			type: 'pattern',
			pattern: 'solid',
			fgColor: {
				argb: this.getPriorityColor(value?.toString()),
			},
			bgColor: {
				argb: this.getPriorityColor(value?.toString()),
			},
		},
	});

	private getRamsPriority(value: string) {
		switch (value) {
			case '1':
				return `>5 jaar herstellen (${value})`;
			case '2':
				return `3-5 jaar herstellen (${value})`;
			case '3':
				return `1-2 jaar herstellen (${value})`;
			case '4':
				return `direct herstellen (${value})`;
			default:
				return '';
		}
	}
}
