import { Controller, Get, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Response } from 'express';

import { ExportDataQuery } from './queries/export-data.query';

@Controller('span-installation-export')
export class SpanInstallationExportController {
	constructor(private readonly queryBus: QueryBus) {}

	@Get('export')
	async exportToXLSX(@Res() res: Response) {
		const { xlsxBuffer, fileName } = await this.queryBus.execute(new ExportDataQuery());
		res.set({
			'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'Content-Disposition': `attachment; filename="${fileName}.xlsx"`,
		});
		res.send(xlsxBuffer);
	}
}
