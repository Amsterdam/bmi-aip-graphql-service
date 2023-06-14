import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { ArkSurveyService } from '../ark-survey.service';
import { ArkSurvey } from '../models/ark-survey.model';

import { FindArkSurveysByAssetCodeQuery } from './find-ark-surveys-by-asset-code.query';

@QueryHandler(FindArkSurveysByAssetCodeQuery)
export class FindArkSurveysByAssetCodeHandler implements IQueryHandler<FindArkSurveysByAssetCodeQuery> {
	constructor(private service: ArkSurveyService) {}

	async execute(query: FindArkSurveysByAssetCodeQuery): Promise<ArkSurvey[]> {
		return this.service.findArkSurveysByAssetCode(query.assetCode);
	}
}
