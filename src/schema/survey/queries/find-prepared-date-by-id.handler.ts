import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { SurveyService } from '../survey.service';

import { FindPreparedDateByIdQuery } from './find-prepared-date-by-id.query';

@QueryHandler(FindPreparedDateByIdQuery)
export class FindPreparedDateByIdHandler implements IQueryHandler<FindPreparedDateByIdQuery> {
	constructor(private service: SurveyService) {}

	public async execute({ id }: FindPreparedDateByIdQuery): Promise<Date> {
		return this.service.findPreparedDateById(id);
	}
}
