import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Unit } from '../models/unit.model';
import { UnitService } from '../unit.service';

import { GetUnitsBySurveyIdQuery } from './get-units-by-survey-id.query';

@QueryHandler(GetUnitsBySurveyIdQuery)
export class GetUnitsBySurveyIdHandler implements IQueryHandler<GetUnitsBySurveyIdQuery> {
	constructor(private service: UnitService) {}

	public async execute(command: GetUnitsBySurveyIdQuery): Promise<Unit[]> {
		return this.service.getUnitsBySurveyId(command.surveyId);
	}
}
