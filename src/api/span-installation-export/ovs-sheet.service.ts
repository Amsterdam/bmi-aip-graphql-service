import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import type { Cell } from 'exceljs';

import { SupportSystemService } from '../../schema/span-installation/support-system.service';
import { BatchService } from '../../schema/batch/batch.service';
import { SupportSystemType } from '../../types';
import { SupportSystem } from '../../schema/span-installation/types/support-system.repository.interface';
import { LuminaireService } from '../../schema/span-installation/luminaire.service';
import { MastSurveyService } from '../../schema/span-installation-survey/mast-survey.service';
import { DocumentService } from '../../schema/document/document.service';
import { MastSurvey } from '../../schema/span-installation-survey/models/mast-survey.model';

import { SpanInstallationExportFactory } from './span-installation-export.factory';
import { OVSExportColumn, OVSExportSpanInstallationBaseData, OVSRow, OVSRowBase } from './types';

@Injectable()
export class OVSSheetService {
	constructor(
		private readonly batchService: BatchService,
		private readonly supportSystemService: SupportSystemService,
		private readonly luminaireService: LuminaireService,
		private readonly mastSurveyService: MastSurveyService,
		private readonly documentService: DocumentService,
	) {}

	/**
	 * JWT token gets set from the initiator as access to the execution context is required to retrieve the token
	 */
	set token(token: string) {
		this.documentService.token = token;
	}

	get token() {
		return this.documentService.token;
	}

	private async getSupportSystemUploadCount(
		assetId: string,
		surveyId: string,
		entityId: string,
	): Promise<number | null> {
		const documents = await this.documentService.findSpanInstallationDocuments(assetId, surveyId, entityId, 'dms');
		return documents.length ?? null;
	}

	private async getMastSurvey(supportSystemId: string): Promise<MastSurvey | undefined> {
		try {
			const mastSurvey = await this.mastSurveyService.getMastSurvey(supportSystemId);
			return mastSurvey;
		} catch (err) {
			// No survey found but that's ok
			return undefined;
		}
	}

	public async getData(ovsAsset: OVSExportSpanInstallationBaseData): Promise<OVSRow[]> {
		const { id, name, code, attributes } = ovsAsset;
		const passportData = SpanInstallationExportFactory.CreatePassportData(attributes);
		const supportSystems = await this.supportSystemService.findByObject(id);
		const batches = await this.batchService.findForAssetThroughSurveys(id);
		const baseRow: OVSRowBase = {
			// OVSBaseData
			id,
			name,
			code,
			// OVSBatchData
			batchNumbers: batches.map((batch) => batch.name).join(', '),
			batchStatus: batches.map((batch) => batch.status).join(', '),
			// OVSPassportData
			...passportData,
		};

		const rows: OVSRow[] = [];

		for (const supportSystem of supportSystems) {
			const mastSurvey =
				supportSystem.type === SupportSystemType.Mast ? await this.getMastSurvey(supportSystem.id) : undefined;
			const uploadCount = await this.getSupportSystemUploadCount(id, supportSystem.surveyId, supportSystem.id);

			rows.push({
				...baseRow,
				...SpanInstallationExportFactory.CreateDecompositionFacadeData(supportSystem),
				...SpanInstallationExportFactory.CreateDecompositionTensionWireData(supportSystem),
				...SpanInstallationExportFactory.CreateDecompositionMastData(supportSystem),
				...SpanInstallationExportFactory.CreateDecompositionNodeData(supportSystem),
				...SpanInstallationExportFactory.CreateDecompositionLuminaireData(),
				...SpanInstallationExportFactory.CreateSurveyMastData({ ...mastSurvey, uploadCount }),
			});

			if (supportSystem.type === SupportSystemType.TensionWire) {
				const luminaires = await this.luminaireService.getLuminaires(supportSystem.id);

				for (const luminaire of luminaires) {
					rows.push({
						...baseRow,
						...SpanInstallationExportFactory.CreateDecompositionFacadeData(),
						...SpanInstallationExportFactory.CreateDecompositionTensionWireData(),
						...SpanInstallationExportFactory.CreateDecompositionMastData(),
						...SpanInstallationExportFactory.CreateDecompositionNodeData(),
						...SpanInstallationExportFactory.CreateDecompositionLuminaireData(luminaire),
						...SpanInstallationExportFactory.CreateSurveyMastData(),
					});
				}
			}
		}

		// Loop over support system types and per type loop over the support systems and add a row for each
		// For each tensionWire, fetch the luminaires and add a row for each luminaire

		return rows;
	}

	// For each row in the Excel sheet all fields for all types of SupportSystem should be present
	private async fillSupportSystemFields(supportSystem: SupportSystem, typeToCheck: SupportSystemType) {
		let data = this.formatFacadeSurveyData(supportSystem);

		if (supportSystem.type !== typeToCheck) {
			// Create an object with null values for all keys
			const nullData = { ...data };
			for (const key in nullData) {
				nullData[key] = null;
			}
			data = nullData;
		}

		return data;
	}

	private formatFacadeSurveyData(supportSystem: SupportSystem): any {
		return {
			facadeTypeDetailed: supportSystem.typeDetailed,
			facadeStreet: supportSystem.location,
			facadeHouseNumber: supportSystem.houseNumber,
			facadeFloor: supportSystem.locationIndication,
			facadeXCoordinate: supportSystem.geographyRD ? supportSystem.geographyRD[0] : '',
			facadeYCoordinate: supportSystem.geographyRD ? supportSystem.geographyRD[1] : '',
			facadeInstallationHeight: supportSystem.installationHeight,
			facadeRemarks: supportSystem.remarks,
		};
	}

	public async addOVSRows(
		worksheet: ExcelJS.Worksheet,
		ovsAsset: OVSExportSpanInstallationBaseData,
		generateHeaders: boolean,
	) {
		const data = await this.getData(ovsAsset);

		const baseDataColumns = this.getBaseDataColumns();
		const batchDataColumns = this.getBatchDataColumns();
		const passportDataColumns = this.getPassportDataColumns();

		const columns = [
			...baseDataColumns,
			...batchDataColumns,
			...passportDataColumns,
			...this.getFacadeColumns(),
			...this.getTensionWireColumns(),
			...this.getLuminaireColumns(),
			...this.getMastColumns(),
			...this.getNodeColumns(),
			...this.getMastSurveyColumns(),
		];

		const headers = columns.map((column) => column.header);

		if (generateHeaders) {
			// Render upper most headers
			this.setDocumentHeaderStyling(worksheet, columns);

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
		for (const rowData of data) {
			this.renderColumns(columns, rowData, worksheet.addRow([]), startingCol);
		}
	}

	public async setDocumentHeaderStyling(
		worksheet: ExcelJS.Worksheet,
		columns: OVSExportColumn[],
	): Promise<ExcelJS.Worksheet> {
		// Add upper most heading (Contracts)
		worksheet.mergeCells('A1', 'AN1');
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

		// Add third row of headings (per category)

		const getColumnLetter = (key: string) =>
			worksheet.getColumn(columns.findIndex((col) => col.key === key) + 1).letter;

		this.setEntityHeader(
			worksheet,
			`${getColumnLetter('facadeTypeDetailed')}3`,
			`${getColumnLetter('facadeRemarks')}3`,
			'Gevel',
			'FFC5E0B4',
		);

		this.setEntityHeader(
			worksheet,
			`${getColumnLetter('tensionWireTypeDetailed')}3`,
			`${getColumnLetter('tensionWireRemarks')}3`,
			'Spandraad',
			'FFC5E0B4',
		);

		this.setEntityHeader(
			worksheet,
			`${getColumnLetter('mastTypeDetailed')}3`,
			`${getColumnLetter('mastRemarks')}3`,
			'Mast',
			'FFE2F0D9',
		);

		this.setEntityHeader(
			worksheet,
			`${getColumnLetter('nodeTypeDetailed')}3`,
			`${getColumnLetter('nodeRemarks')}3`,
			'Node',
			'FFC5E0B4',
		);

		this.setEntityHeader(
			worksheet,
			`${getColumnLetter('luminaireTypeDetailed')}3`,
			`${getColumnLetter('luminaireRemarks')}3`,
			'Armatuur',
			'FFe2f0d9',
		);

		this.setEntityHeader(
			worksheet,
			`${getColumnLetter('surveyMastDamage')}3`,
			`${getColumnLetter('surveyMastRemarks')}3`,
			'Mast',
			'FFB4C7E7',
		);

		return worksheet;
	}

	private setEntityHeader(
		worksheet: ExcelJS.Worksheet,
		startCell: string,
		endCell: string,
		name: string,
		color: string,
	) {
		worksheet.mergeCells(startCell, endCell);
		worksheet.getCell(startCell).value = name;
		worksheet.getCell(startCell).alignment = { vertical: 'middle', horizontal: 'center' };
		worksheet.getCell(startCell).font = {
			name: 'Calibri',
			bold: true,
		};
		worksheet.getCell(startCell).font = {
			name: 'Calibri',
			bold: true,
		};
		worksheet.getCell(startCell).fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: color },
		};
	}

	public getBaseDataColumns(): OVSExportColumn[] {
		return [
			{
				header: 'OVS nummer',
				key: 'code',
				headerStyle: { ...this.headerStyle, italic: true },
				width: 16,
			},
		];
	}

	// public async getBatchDataColumns(ovsAsset: OVSExportSpanInstallationBaseData): Promise<OVSExportColumn[]> {
	// 	const batches = await this.batchService.findForAssetThroughSurveys(ovsAsset.id);
	// }

	public getBatchDataColumns(): OVSExportColumn[] {
		return [
			{
				header: 'Batch nummer(s)',
				key: 'batchNumbers',
				headerStyle: { ...this.headerStyle, italic: true },
				width: 16,
			},
			{
				header: 'Batch status',
				key: 'batchStatus',
				headerStyle: { ...this.headerStyle, italic: true },
				width: 16,
			},
		];
	}

	public getPassportDataColumns(): OVSExportColumn[] {
		return [
			{
				header: 'Straat',
				key: 'passportStreet',
				headerStyle: { ...this.headerStyle, italic: true },
				width: 16,
			},
			{
				header: 'Buurt',
				key: 'passportNeighborhood',
				headerStyle: { ...this.headerStyle, italic: true },
				width: 16,
			},
			{
				header: 'Wijk',
				key: 'passportDistrict',
				headerStyle: { ...this.headerStyle, italic: true },
				width: 16,
			},
			{
				header: 'Stadsdeel',
				key: 'passportCityArea',
				headerStyle: { ...this.headerStyle, italic: true },
				width: 16,
			},
			{
				header: 'Splitsingen',
				key: 'passportSplits',
				headerStyle: { ...this.headerStyle, italic: true },
				width: 16,
			},
			{
				header: 'Dubbeldraads',
				key: 'passportDoubleWired',
				headerStyle: { ...this.headerStyle, italic: true },
				width: 16,
			},
			{
				header: 'Boven trambaan',
				key: 'tramTracks',
				headerStyle: { ...this.headerStyle, italic: true },
				width: 16,
			},
			{
				header: 'Opmerkingen',
				key: 'notes',
				headerStyle: { ...this.headerStyle, italic: true },
				width: 16,
			},
		];
	}

	private getFacadeColumns(): OVSExportColumn[] {
		return [
			{
				header: 'Type gedetailleerd',
				headerStyle: this.headerStyle,
				key: 'facadeTypeDetailed',
				width: 16,
			},
			{
				header: 'Straat',
				headerStyle: this.headerStyle,
				key: 'facadeLocation',
				width: 16,
			},
			{
				header: 'Huisnummer',
				headerStyle: this.headerStyle,
				key: 'facadeHouseNumber',
				width: 16,
			},
			{
				header: 'Verdieping',
				headerStyle: this.headerStyle,
				key: 'facadeLocationIndication',
				width: 16,
			},
			{
				header: 'X coordinaat',
				headerStyle: this.headerStyle,
				key: 'facadeXCoordinate',
				width: 16,
			},
			{
				header: 'Y coordinaat',
				headerStyle: this.headerStyle,
				key: 'facadeYCoordinate',
				width: 16,
			},
			{
				header: 'Aanleghoogte',
				headerStyle: this.headerStyle,
				key: 'facadeInstallationHeight',
				width: 16,
			},
			{
				header: 'Opmerkingen',
				headerStyle: this.headerStyle,
				key: 'facadeRemarks',
				width: 16,
			},
		];
	}

	private getTensionWireColumns(): OVSExportColumn[] {
		return [
			{
				header: 'Type gedetailleerd',
				key: 'tensionWireTypeDetailed',
				headerStyle: this.headerStyle,
				width: 16,
			},
			{
				header: 'Lengte spandraad',
				key: 'tensionWireInstallationLength',
				headerStyle: this.headerStyle,
				width: 16,
			},
			{
				header: 'Straat',
				key: 'tensionWireLocation',
				headerStyle: this.headerStyle,
				width: 16,
			},
			{
				header: 'Opmerkingen',
				key: 'tensionWireRemarks',
				headerStyle: this.headerStyle,
				width: 16,
			},
		];
	}

	private getLuminaireColumns(): OVSExportColumn[] {
		return [
			{
				header: 'Straat',
				key: 'luminaireLocation',
				headerStyle: this.headerStyle,
				width: 16,
			},
			{
				header: 'Reeds voorzien van LED',
				key: 'luminaireHasLED',
				headerStyle: this.headerStyle,
				width: 16,
			},
			{
				header: 'X coördinaat',
				key: 'luminaireXCoordinate',
				headerStyle: this.headerStyle,
				width: 16,
			},
			{
				header: 'Y coördinaat',
				key: 'luminaireYCoordinate',
				headerStyle: this.headerStyle,
				width: 16,
			},
			{
				header: 'Opmerkingen',
				key: 'luminaireRemarks',
				headerStyle: this.headerStyle,
				width: 16,
			},
		];
	}

	private getMastColumns(): OVSExportColumn[] {
		return [
			{
				header: 'Type gedetailleerd',
				key: 'mastTypeDetailed',
				headerStyle: this.headerStyle,
				width: 16,
			},
			{
				header: 'Straat',
				key: 'mastLocation',
				headerStyle: this.headerStyle,
				width: 16,
			},
			{
				header: 'X coordinaat',
				headerStyle: this.headerStyle,
				key: 'mastXCoordinate',
				width: 16,
			},
			{
				header: 'Y coordinaat',
				headerStyle: this.headerStyle,
				key: 'mastYCoordinate',
				width: 16,
			},
			{
				header: 'Aanleghoogte',
				headerStyle: this.headerStyle,
				key: 'mastInstallationHeight',
				width: 16,
			},
			{
				header: 'Opmerkingen',
				headerStyle: this.headerStyle,
				key: 'mastRemarks',
				width: 16,
			},
		];
	}

	private getNodeColumns(): OVSExportColumn[] {
		return [
			{
				header: 'Type gedetailleerd',
				key: 'nodeTypeDetailed',
				headerStyle: this.headerStyle,
				width: 16,
			},
			{
				header: 'Straat',
				key: 'nodeLocation',
				headerStyle: this.headerStyle,
				width: 16,
			},
			{
				header: 'X coordinaat',
				headerStyle: this.headerStyle,
				key: 'nodeXCoordinate',
				width: 16,
			},
			{
				header: 'Y coordinaat',
				headerStyle: this.headerStyle,
				key: 'nodeYCoordinate',
				width: 16,
			},
			{
				header: 'Aanleghoogte',
				headerStyle: this.headerStyle,
				key: 'nodeInstallationHeight',
				width: 16,
			},
			{
				header: 'Opmerkingen',
				headerStyle: this.headerStyle,
				key: 'nodeRemarks',
				width: 16,
			},
		];
	}

	private getMastSurveyColumns(): OVSExportColumn[] {
		return [
			{
				header: 'Schade aan mast?',
				key: 'surveyMastDamage',
				renderCell: this.renderBooleanCell,
				headerStyle: this.headerStyle,
				width: 16,
			},
			{
				header: 'Ontbrekende onderdelen aan de mast?',
				key: 'surveyMastMissingParts',
				renderCell: this.renderBooleanCell,
				headerStyle: this.headerStyle,
				width: 16,
			},
			{
				header: 'Hoek van de spanmast',
				key: 'surveyTensionMastAngle',
				headerStyle: this.headerStyle,
				width: 16,
			},
			{
				header: 'Schade aan mastopzetstuk?',
				key: 'surveyMastAttachmentDamage',
				renderCell: this.renderBooleanCell,
				headerStyle: this.headerStyle,
				width: 16,
			},
			{
				header: 'Ontbrekende onderdelen aan mastbeugel?',
				key: 'surveyMastBracketMissingParts',
				renderCell: this.renderBooleanCell,
				headerStyle: this.headerStyle,
				width: 16,
			},
			{
				header: 'Schade aan mastbeugel?',
				headerStyle: this.headerStyle,
				renderCell: this.renderBooleanCell,
				key: 'surveyMastBracketDamage',
				width: 16,
			},
			{
				header: 'Beeldmateriaal',
				headerStyle: this.headerStyle,
				key: 'surveyMastImagery',
				width: 16,
			},
			{
				header: 'Opmerkingen',
				headerStyle: this.headerStyle,
				key: 'surveyMastRemarks',
				width: 16,
			},
		];
	}

	private renderBooleanCell(cell: ExcelJS.Cell, value: unknown): void {
		cell.value = value !== undefined ? (value ? 'Ja' : 'Nee') : null;
	}

	private renderCellDefault(cell: Cell, value: string | number | boolean | Date) {
		cell.value = value;
	}

	private renderColumns(columns: OVSExportColumn[], data: any, row: ExcelJS.Row, startingCol: number): void {
		columns.forEach((column: OVSExportColumn, columnIdx: number) => {
			const cell: ExcelJS.Cell = row.getCell(startingCol + columnIdx);

			if (column?.renderCell) {
				column.renderCell(cell, data[column.key], row.number, cell.col);
			} else {
				this.renderCellDefault(cell, data[column.key]);
			}

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
