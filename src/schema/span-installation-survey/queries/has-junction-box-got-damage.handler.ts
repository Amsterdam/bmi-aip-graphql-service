import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { JunctionBoxSurveyService } from '../junction-box-survey.service';

import { HasJunctionBoxGotDamageQuery } from './has-junction-box-got-damage.query';

@QueryHandler(HasJunctionBoxGotDamageQuery)
export class HasJunctionBoxGotDamageHandler implements IQueryHandler<HasJunctionBoxGotDamageQuery> {
	constructor(private service: JunctionBoxSurveyService) {}

	async execute(query: HasJunctionBoxGotDamageQuery): Promise<boolean> {
		return this.service.hasDamage(query.junctionBoxId);
	}
}
