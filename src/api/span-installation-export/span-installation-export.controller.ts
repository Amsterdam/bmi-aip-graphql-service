import { Controller, Get, Param, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

import { ExportBatchDataQuery } from './queries/export-batch-data.query';
import { ExportAllDataQuery } from './queries/export-all-data.query';

@Controller('api/span-installation-export')
export class SpanInstallationExportController {
	constructor(private readonly queryBus: QueryBus) {}

	@Get('export-by-batch/:batchId')
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	async exportBatchToXLSX(@Param('batchId') batchId: string, @Res() res: Response) {
		const { xlsxBuffer, fileName } = await this.queryBus.execute(new ExportBatchDataQuery(batchId));
		res.set({
			'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'Content-Disposition': `attachment; filename="${fileName}.xlsx"`,
		});
		res.send(xlsxBuffer);
	}

	@Get('export-all')
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	async exportToXLSX(@Res() res: Response) {
		const { xlsxBuffer, fileName } = await this.queryBus.execute(new ExportAllDataQuery());
		res.set({
			'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'Content-Disposition': `attachment; filename="${fileName}.xlsx"`,
		});
		res.send(xlsxBuffer);
	}
}
