import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

import { OVSExportAllQuery } from './queries/ovs-export-all.query';
import { OVSExportByBatchQuery } from './queries/ovs-export-by-batch.query';
import { OVSExportByObjectQuery } from './queries/ovs-export-by-object.query';

@Controller('api/span-installation-export')
export class SpanInstallationExportController {
	constructor(private queryBus: QueryBus, private readonly logger: Logger) {}

	@Get('export-by-object/:objectId')
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async exportObjectToXLSX(@Param('batchId') objectId: string, @Res() response: Response): Promise<void> {
		try {
			await this.queryBus.execute<OVSExportByObjectQuery>(new OVSExportByObjectQuery(response, objectId));
		} catch (error) {
			this.logger.error('Error:', error);
			response.status(500).send({ error });
		}
	}

	@Get('export-by-batch/:batchId')
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async exportBatchToXLSX(@Param('batchId') batchId: string, @Res() response: Response): Promise<void> {
		try {
			await this.queryBus.execute<OVSExportByBatchQuery>(new OVSExportByBatchQuery(response, batchId));
		} catch (error) {
			this.logger.error('Error:', error);
			response.status(500).send({ error });
		}
	}

	@Get('ovs-export-all')
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async exportToXLSX(@Res() response: Response): Promise<void> {
		try {
			await this.queryBus.execute<OVSExportAllQuery>(new OVSExportAllQuery(response));
		} catch (error) {
			this.logger.error('Error:', error);
			response.status(500).send({ error });
		}
	}
}
