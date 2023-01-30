import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Element } from '../models/element.model';
import { ElementService } from '../element.service';

import { GetElementsBySurveyIdQuery } from './get-elements-by-survey-id.query';

@QueryHandler(GetElementsBySurveyIdQuery)
export class GetElementsBySurveyIdHandler implements IQueryHandler<GetElementsBySurveyIdQuery> {
	constructor(private service: ElementService) {}

	public async execute(command: GetElementsBySurveyIdQuery): Promise<Element[]> {
		return this.service.getElements(command.surveyId);
	}
}
