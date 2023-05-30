import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { JunctionBoxSurvey } from '../models/junction-box-survey.model';
import { JunctionBoxSurveyService } from '../junction-box-survey.service';

import { GetJunctionBoxDamageQuery } from './get-junction-box-damage.query';

@QueryHandler(GetJunctionBoxDamageQuery)
export class GetJunctionBoxDamageHandler implements IQueryHandler<GetJunctionBoxDamageQuery> {
	constructor(private service: JunctionBoxSurveyService) {}

	async execute(query: GetJunctionBoxDamageQuery): Promise<JunctionBoxSurvey> {
		return this.service.getJunctionBoxSurveyOnPermanentId(query.junctionBoxId);
	}
}
