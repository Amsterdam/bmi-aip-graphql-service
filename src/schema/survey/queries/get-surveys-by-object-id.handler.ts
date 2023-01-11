import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Survey } from '../models/survey.model';
import { SurveyService } from '../survey.service';

import { GetSurveysByObjectIdQuery } from './get-surveys-by-object-id.query';

@QueryHandler(GetSurveysByObjectIdQuery)
export class GetSurveysByObjectIdHandler implements IQueryHandler<GetSurveysByObjectIdQuery> {
	constructor(private repository: SurveyService) {}

	public async execute(command: GetSurveysByObjectIdQuery): Promise<Survey[]> {
		return this.repository.getSurveysByObjectId(command.objectId);
	}
}
