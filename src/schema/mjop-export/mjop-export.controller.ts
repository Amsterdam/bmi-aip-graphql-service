import { Controller, Get, Param, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { Response } from 'express';

import { MjopExportBySurveyIdQuery } from './queries/mjop-export-by-survey-id.query';

@Controller('rest/mjop-data')
export class MjopExportController {
	constructor(private queryBus: QueryBus) {}

	@Get(':surveyId')
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	public async surveyMjopExport(@Param('surveyId') surveyId: string, @Res() response: Response): Promise<void> {
		try {
			await this.queryBus.execute<MjopExportBySurveyIdQuery>(new MjopExportBySurveyIdQuery(surveyId, response));
		} catch (error) {
			console.error(error);
			response.status(500).send({ error: 'Internal server error' });
		}
	}
}
