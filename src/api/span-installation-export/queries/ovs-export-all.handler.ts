import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as ExcelJS from 'exceljs';
import { Worksheet } from 'exceljs';
import { Logger } from '@nestjs/common';

import { SpanInstallationExportService } from '../span-installation-export.service';
import { OVSExportSpanInstallationBaseData } from '../types/span-installation';
import { OVSSheetService } from '../ovs-sheet.service';

import { OVSExportAllQuery } from './ovs-export-all.query';

@QueryHandler(OVSExportAllQuery)
export class OVSExportAllHandler implements IQueryHandler<OVSExportAllQuery> {
	constructor(
		private readonly exporterService: SpanInstallationExportService,
		private readonly addOVSSheetService: OVSSheetService,
		private readonly logger: Logger,
	) {}

	async execute({ response, jwtToken }: OVSExportAllQuery) {
		const workbook = new Promise<ExcelJS.Workbook>((resolve) => {
			const wb = new ExcelJS.Workbook();
			resolve(wb);
		});

		try {
			const generatedWorkbook = await workbook;
			const worksheet: Worksheet = generatedWorkbook.addWorksheet('OVS', {
				views: [{ state: 'frozen', ySplit: 1, xSplit: 1 }],
			});
			const objects: OVSExportSpanInstallationBaseData[] = await this.exporterService.getObjectsInAllBatches();

			let generateHeaders = true;
			for (const object of objects) {
				this.addOVSSheetService.token = jwtToken;
				await this.addOVSSheetService.addOVSRows(worksheet, object, generateHeaders);
				generateHeaders = false;
			}

			const fileName = `OVS-all-export-${new Date().toISOString()}`;
			response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			response.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
			response.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
			await generatedWorkbook.xlsx.write(response);
			return response.end();
		} catch (err) {
			this.logger.error('Error:', err);
			response.status(500).send({});
		}
	}
}
