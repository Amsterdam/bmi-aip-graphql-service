import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import ExcelJS from 'exceljs';

import { SpanInstallationExportService } from '../span-installation-export.service';

import { ExportBatchDataQuery } from './export-batch-data.query';

@QueryHandler(ExportBatchDataQuery)
export class ExportBatchDataHandler
	implements IQueryHandler<ExportBatchDataQuery, { xlsxBuffer: ExcelJS.Buffer; fileName: string }>
{
	constructor(private readonly exporterService: SpanInstallationExportService) {}

	async execute(query: ExportBatchDataQuery) {
		return {
			xlsxBuffer: await this.exporterService.exportByBatch(query.batchId),
			fileName: `OVS-export-${new Date().toISOString()}`,
		};
	}
}
