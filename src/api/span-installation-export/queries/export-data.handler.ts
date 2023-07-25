import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import ExcelJS from 'exceljs';

import { SpanInstallationExportService } from '../span-installation-export.service';

import { ExportDataQuery } from './export-data.query';

@QueryHandler(ExportDataQuery)
export class ExportDataHandler
	implements IQueryHandler<ExportDataQuery, { xlsxBuffer: ExcelJS.Buffer; fileName: string }>
{
	constructor(private readonly exporterService: SpanInstallationExportService) {}

	async execute(query: ExportDataQuery) {
		return {
			xlsxBuffer: await this.exporterService.createXLSX(),
			fileName: `OVS-export-${new Date().toISOString()}`,
		};
	}
}
