import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { SurveyService } from '../survey.service';

import { FindVerifiedDateByIdQuery } from './find-verified-date-by-id.query';

@QueryHandler(FindVerifiedDateByIdQuery)
export class FindVerifiedDateByIdHandler implements IQueryHandler<FindVerifiedDateByIdQuery> {
	constructor(private service: SurveyService) {}

	public async execute({ id }: FindVerifiedDateByIdQuery): Promise<Date> {
		return this.service.findVerifiedDateById(id);
	}
}
