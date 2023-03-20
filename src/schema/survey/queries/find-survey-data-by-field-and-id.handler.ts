import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { SurveyService } from '../survey.service';

import { FindSurveyDataByFieldAndIdQuery } from './find-survey-data-by-field-and-id.query';

@QueryHandler(FindSurveyDataByFieldAndIdQuery)
export class FindSurveyDataByFieldAndIdHandler implements IQueryHandler<FindSurveyDataByFieldAndIdQuery> {
	constructor(private service: SurveyService) {}

	public async execute({ id, field }: FindSurveyDataByFieldAndIdQuery): Promise<any> {
		return this.service.findSurveyDataByFieldAndId(id, field);
	}
}
