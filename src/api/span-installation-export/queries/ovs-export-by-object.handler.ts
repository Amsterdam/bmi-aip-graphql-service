import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import ExcelJS, { Worksheet } from 'exceljs';
import { Logger } from '@nestjs/common';

import { SpanInstallationExportService } from '../span-installation-export.service';
import { OVSExportSpanInstallationBaseData } from '../types/span-installation';
import { AddOVSSheetService } from '../add-ovs-sheet.service';

import { OVSExportByObjectQuery } from './ovs-export-by-object.query';

@QueryHandler(OVSExportByObjectQuery)
export class OVSExportByObjectHandler implements IQueryHandler<OVSExportByObjectQuery> {
	constructor(
		private readonly exporterService: SpanInstallationExportService,
		private readonly addOVSSheetService: AddOVSSheetService,
		private readonly logger: Logger,
	) {}

	async execute(query: OVSExportByObjectQuery) {
		const workbook = new Promise<ExcelJS.Workbook>((resolve) => {
			const wb = new ExcelJS.Workbook();
			resolve(wb);
		});

		try {
			const generatedWorkbook = await workbook;
			const worksheet: Worksheet = generatedWorkbook.addWorksheet('OVS', {
				views: [{ state: 'frozen', ySplit: 1, xSplit: 1 }],
			});
			const objects: OVSExportSpanInstallationBaseData[] = await this.exporterService.getObjectById(
				query.objectId,
			);

			let generateHeaders = true;
			for (const object of objects) {
				await this.addOVSSheetService.addOVSSheet(worksheet, object, generateHeaders);
				generateHeaders = false;
			}

			const fileName = `OVS-object-export-${new Date().toISOString()}`;
			query.response.setHeader(
				'Content-Type',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			);
			query.response.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
			query.response.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
			await generatedWorkbook.xlsx.write(query.response);
			return query.response.end();
		} catch (err) {
			this.logger.error('Error:', err);
			query.response.status(500).send({});
		}
	}
}
