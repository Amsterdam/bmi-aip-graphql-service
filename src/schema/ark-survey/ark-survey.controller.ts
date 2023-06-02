import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '@nestjs/swagger';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';

import { ArkSurvey } from './models/ark-survey.model';
import { FindArkSurveysByAssetCodeQuery } from './queries/find-ark-surveys-by-asset-code.query';
import { ArkSurveyWithReachSegments } from './types/ark-survey.repository.interface';

@Controller('ark-data')
export class ArkSurveyController {
	constructor(private queryBus: QueryBus) {}

	@Get(':assetCode')
	@Roles({ roles: ['realm:aip_owner', 'realm:aip_admin'], mode: RoleMatchingMode.ANY })
	@ApiResponse({ status: 200, type: ArkSurvey, description: 'Returns all ARK surveys for a given asset' })
	public async getArkSurveys(@Param('assetCode') assetCode: string): Promise<ArkSurveyWithReachSegments[]> {
		return this.queryBus.execute<FindArkSurveysByAssetCodeQuery>(new FindArkSurveysByAssetCodeQuery(assetCode));
	}
}
