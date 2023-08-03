import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

import { BatchRepository } from '../../schema/batch/batch.repository';

import { SpanInstallationExportRepository } from './span-installation-export.repository';
import { OVSExportSpanInstallationWithBatchDetails } from './types/span-installation';

@Injectable()
export class SpanInstallationExportService {
	public constructor(
		private readonly spanRepository: SpanInstallationExportRepository,
		private readonly batchRepository: BatchRepository,
	) {}

	async getObjectsInBatch(batchId: string): Promise<OVSExportSpanInstallationWithBatchDetails[]> {
		const batchDetails = await this.batchRepository.getBatchDetails(batchId);
		const spanInstallations = await this.spanRepository.findSpanInstallations(batchId);

		return spanInstallations.map((spanInstallation: OVSExportSpanInstallationWithBatchDetails) => {
			return {
				...spanInstallation,
				batch: batchDetails,
			};
		});
	}

	async getObjectsInAllBatches(): Promise<OVSExportSpanInstallationWithBatchDetails[]> {
		const batchDetails = await this.batchRepository.getAllOVSBatches();
		const result = [];

		for (const batch of batchDetails) {
			let spanInstallations = await this.spanRepository.findSpanInstallations(batch.id);

			spanInstallations = spanInstallations.map((spanInstallation: OVSExportSpanInstallationWithBatchDetails) => {
				return {
					...spanInstallation,
					batch: batch,
				};
			});

			result.push(...spanInstallations);
		}

		return result;
	}

	setDocumentHeaderStyling(worksheet: ExcelJS.Worksheet): ExcelJS.Worksheet {
		// Add upper most heading (Contracts)
		worksheet.mergeCells('A1', 'N1');
		worksheet.getCell('A1').value = 'Contract - 1';
		worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
		worksheet.getCell('A1').fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FF416289' },
		};

		// Add second rows of heading (Categories)
		worksheet.mergeCells('A2', 'N3');
		worksheet.getCell('A2').value = 'Paspoort';
		worksheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' };
		worksheet.getCell('A2').font = { bold: true };
		worksheet.getCell('A2').font = { bold: true };
		worksheet.getCell('A2').fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FFCEDFF0' },
		};

		return worksheet;
	}

	async exportByBatch(batchId: string): Promise<ExcelJS.Buffer> {
		return this.createXLSX(await this.getObjectsInBatch(batchId));
	}

	async exportAll(): Promise<ExcelJS.Buffer> {
		return this.createXLSX(await this.getObjectsInAllBatches());
	}

	async createXLSX(data: OVSExportSpanInstallationWithBatchDetails[]): Promise<ExcelJS.Buffer> {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Overspanningsinstallatie Export');

		// Set up first and second row of heading (Contracs and Categories)
		this.setDocumentHeaderStyling(worksheet);

		// Add third row of headings (fields in each category)
		worksheet.addRow([
			'OVS nummer',
			'Techview id',
			'Id-mast',
			'Aanp. K-Hang/Bol',
			'Batch nummer(s)',
			'Batch status',
			'Straat',
			'Buurt',
			'Wijk',
			'Stadsdeel',
			'Splitsingen',
			'Dubbeldraads',
			'Boven trambaan',
			'Opmerking',
		]);

		worksheet.getRow(4).eachCell({ includeEmpty: false }, function (cell) {
			worksheet.getCell(cell.address).fill = {
				type: 'pattern',
				pattern: 'solid',
				fgColor: { argb: 'ffdfdfdf' },
			};
			worksheet.getCell(cell.address).font = { bold: true };
			worksheet.getCell(cell.address).border = {
				top: { style: 'thin' },
				left: { style: 'thin' },
				bottom: { style: 'thin' },
				right: { style: 'thin' },
			};
		});

		data.map((row) => {
			worksheet.addRow([
				row.code,
				'', //TODO: Techview id (depending on BAIP-1444)
				'', //TODO: Id-mast (depending on BAIP-1444)
				'', //TODO: Aanp. K-Hang/Bol (depending on BAIP-1444)
				row.batch.name,
				row.batch.status,
				row.attributes.passportStreet ? row.attributes.passportStreet : '',
				row.attributes.passportCityArea ? row.attributes.passportCityArea : '',
				row.attributes.passportNeighborhood ? row.attributes.passportNeighborhood : '',
				row.attributes.passportDistrict ? row.attributes.passportDistrict : '',
				row.attributes.passportSplits ? row.attributes.passportSplits : '',
				row.attributes.passportDoubleWired ? row.attributes.passportDoubleWired : '',
				row.attributes.tramTracks ? row.attributes.tramTracks : '',
				row.attributes.notes ? row.attributes.notes : '',
			]);
		});

		return workbook.xlsx.writeBuffer();
	}
}
