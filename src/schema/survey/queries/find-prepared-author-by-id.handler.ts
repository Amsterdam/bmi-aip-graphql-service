import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { SurveyService } from '../survey.service';

import { FindPreparedAuthorByIdQuery } from './find-prepared-author-by-id.query';

@QueryHandler(FindPreparedAuthorByIdQuery)
export class FindPreparedAuthorByIdHandler implements IQueryHandler<FindPreparedAuthorByIdQuery> {
	constructor(private service: SurveyService) {}

	public async execute({ id }: FindPreparedAuthorByIdQuery): Promise<string> {
		return this.service.findPreparedAuthorById(id);
	}
}
