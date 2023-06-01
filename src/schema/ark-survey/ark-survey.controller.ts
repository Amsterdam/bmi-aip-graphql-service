import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '@nestjs/swagger';

import { ReachSegment } from './models/reach-segment.model';
import { ArkSurvey } from './models/ark-survey.model';
import { FindArkSurveyReachSegmentsQuery } from './queries/find-ark-survey-reach-segments.query';
import { GetArkSurveyBySurveyIdQuery } from './queries/get-ark-survey-by-survey.query';
import { FindArkSurveysByAssetCodeQuery } from './queries/find-ark-surveys-by-asset-code.query';

@Controller('ark-data')
export class ArkSurveyController {
	constructor(private queryBus: QueryBus) {}

	@Get(':assetCode')
	@ApiResponse({ status: 200, type: ArkSurvey, description: 'Returns all ARK surveys for a given asset' })
	public async getArkSurveys(@Param('assetCode') assetCode: string): Promise<ArkSurvey[]> {
		return this.queryBus.execute<FindArkSurveysByAssetCodeQuery>(new FindArkSurveysByAssetCodeQuery(assetCode));
	}

	@Get('surveys/:surveyId')
	@ApiResponse({ status: 200, type: ArkSurvey, description: 'Returns an ArkSurvey' })
	public async getArkSurvey(@Param('surveyId') surveyId: string): Promise<ArkSurvey> {
		return this.queryBus.execute<GetArkSurveyBySurveyIdQuery>(new GetArkSurveyBySurveyIdQuery(surveyId));
	}

	@Get('surveys/:surveyId/reach-segments')
	@ApiResponse({
		status: 200,
		type: ReachSegment,
		isArray: true,
		description: 'Returns the Reach Segments (rakdelen) of an ArkSurvey',
	})
	async reachSegments(@Param('surveyId') surveyId: string): Promise<ReachSegment[]> {
		const arkSurvey = await this.queryBus.execute<GetArkSurveyBySurveyIdQuery>(
			new GetArkSurveyBySurveyIdQuery(surveyId),
		);
		return this.queryBus.execute<FindArkSurveyReachSegmentsQuery>(
			new FindArkSurveyReachSegmentsQuery(arkSurvey.id),
		);
	}
}
