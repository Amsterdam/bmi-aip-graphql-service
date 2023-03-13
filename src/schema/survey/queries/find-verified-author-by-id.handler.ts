import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { SurveyService } from '../survey.service';

import { FindVerifiedAuthorByIdQuery } from './find-verified-author-by-id.query';

@QueryHandler(FindVerifiedAuthorByIdQuery)
export class FindVerifiedAuthorByIdHandler implements IQueryHandler<FindVerifiedAuthorByIdQuery> {
	constructor(private service: SurveyService) {}

	public async execute({ id }: FindVerifiedAuthorByIdQuery): Promise<string> {
		return this.service.findVerifiedAuthorById(id);
	}
}
