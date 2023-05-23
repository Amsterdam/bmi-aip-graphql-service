import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiResponse } from '@nestjs/swagger';

import { ReachSegment } from './models/reach-segment.model';
import { ArkSurvey } from './models/ark-survey.model';
import { FindArkSurveyReachSegmentsQuery } from './queries/find-ark-survey-reach-segments.query';
import { GetArkSurveyBySurveyIdQuery } from './queries/get-ark-survey-by-survey.query';

@Controller('ark-survey')
export class ArkSurveyController {
	constructor(private queryBus: QueryBus) {}

	@Get(':surveyId')
	@ApiResponse({ status: 200, type: ArkSurvey, description: 'Returns an ArkSurvey' })
	public async getArkSurvey(@Param('surveyId') surveyId: string): Promise<ArkSurvey> {
		return this.queryBus.execute<GetArkSurveyBySurveyIdQuery>(new GetArkSurveyBySurveyIdQuery(surveyId));
	}

	@Get(':surveyId/reach-segments')
	@ApiResponse({
		status: 200,
		type: ReachSegment,
		isArray: true,
		description: 'Returns the Reach Segments of an ArkSurvey',
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
