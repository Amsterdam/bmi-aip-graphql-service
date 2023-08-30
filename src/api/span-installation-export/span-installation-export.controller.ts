import type { IncomingHttpHeaders } from 'http';

import { Controller, Get, Logger, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryBus } from '@nestjs/cqrs';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

import { OVSExportAllQuery } from './queries/ovs-export-all.query';
import { OVSExportByBatchQuery } from './queries/ovs-export-by-batch.query';
import { OVSExportByObjectQuery } from './queries/ovs-export-by-object.query';
import { TokenNotSetException } from './exceptions/token-not-set.exception';

@Controller('api/span-installation-export')
export class SpanInstallationExportController {
	constructor(private queryBus: QueryBus, private readonly logger: Logger) {}

	private extractJwt(headers: IncomingHttpHeaders) {
		if (headers && !headers?.authorization) {
			this.logger.verbose('No authorization header');
			throw new TokenNotSetException();
		}

		const auth: string[] = headers.authorization.split(' ');

		// We only allow bearer
		if (auth[0].toLowerCase() !== 'bearer') {
			this.logger.verbose('No bearer token');
			throw new TokenNotSetException();
		}

		return auth[1];
	}

	@Get('export-by-object/:objectId')
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async exportObjectToXLSX(
		@Param('batchId') objectId: string,
		@Req() request: Request,
		@Res() response: Response,
	): Promise<void> {
		try {
			const jwtToken = this.extractJwt(request.headers);
			await this.queryBus.execute<OVSExportByObjectQuery>(
				new OVSExportByObjectQuery(response, objectId, jwtToken),
			);
		} catch (error) {
			this.logger.error('Error:', error);
			response.status(500).send({ error });
		}
	}

	@Get('export-by-batch/:batchId')
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async exportBatchToXLSX(
		@Param('batchId') batchId: string,
		@Req() request: Request,
		@Res() response: Response,
	): Promise<void> {
		try {
			const jwtToken = this.extractJwt(request.headers);
			await this.queryBus.execute<OVSExportByBatchQuery>(new OVSExportByBatchQuery(response, batchId, jwtToken));
		} catch (error) {
			this.logger.error('Error:', error);
			response.status(500).send({ error });
		}
	}

	@Get('export-all')
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async exportToXLSX(@Req() request: Request, @Res() response: Response): Promise<void> {
		try {
			const jwtToken = this.extractJwt(request.headers);
			await this.queryBus.execute<OVSExportAllQuery>(new OVSExportAllQuery(response, jwtToken));
		} catch (error) {
			this.logger.error('Error:', error);
			response.status(500).send({ error });
		}
	}
}
