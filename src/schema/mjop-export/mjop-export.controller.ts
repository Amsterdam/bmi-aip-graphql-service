import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { Response } from 'express';

import { MJOPExportBySurveyIdQuery } from './queries/mjop-export-by-survey-id.query';
import { MJOPExportByBatchIdQuery } from './queries/mjop-export-by-batch-id.query';
import { MJOPExportByObjectIdQuery } from './queries/mjop-export-by-object-id.query';

@Controller('api/mjop-export')
export class MJOPExportController {
	constructor(private queryBus: QueryBus, private readonly logger: Logger) {}

	@Get('survey/:surveyId')
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async surveyMJOPExport(@Param('surveyId') surveyId: string, @Res() response: Response): Promise<void> {
		try {
			await this.queryBus.execute<MJOPExportBySurveyIdQuery>(new MJOPExportBySurveyIdQuery(surveyId, response));
		} catch (error) {
			this.logger.error('Error:', error);
			response.status(500).send({ error });
		}
	}

	@Get('object/:objectId')
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async surveyMJOPExportByObjectId(
		@Param('objectId') objectId: string,
		@Res() response: Response,
	): Promise<void> {
		try {
			await this.queryBus.execute<MJOPExportByObjectIdQuery>(new MJOPExportByObjectIdQuery(objectId, response));
		} catch (error) {
			this.logger.error('Error:', error);
			response.status(500).send({ error });
		}
	}

	@Get('batch/:batchId/inspectionType/:inspectionStandardType')
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin', 'realm:aip_survey'], mode: RoleMatchingMode.ANY })
	public async surveyMJOPExportForBatch(
		@Param('batchId') batchId: string,
		@Param('inspectionStandardType') inspectionStandardType: string,
		@Res() response: Response,
	): Promise<void> {
		try {
			await this.queryBus.execute<MJOPExportByBatchIdQuery>(
				new MJOPExportByBatchIdQuery(batchId, inspectionStandardType, response),
			);
		} catch (error) {
			this.logger.error('Error:', error);
			response.status(500).send({ error });
		}
	}
}
