import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import ExcelJS from 'exceljs';

import { SpanInstallationExportService } from '../span-installation-export.service';

import { ExportAllDataQuery } from './export-all-data.query';

@QueryHandler(ExportAllDataQuery)
export class ExportAllDataHandler
	implements IQueryHandler<ExportAllDataQuery, { xlsxBuffer: ExcelJS.Buffer; fileName: string }>
{
	constructor(private readonly exporterService: SpanInstallationExportService) {}

	async execute(query: ExportAllDataQuery) {
		return {
			xlsxBuffer: await this.exporterService.exportAll(),
			fileName: `OVS-batch-export-${new Date().toISOString()}`,
		};
	}
}
