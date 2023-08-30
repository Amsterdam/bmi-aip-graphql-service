import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { SupportSystemService } from '../support-system.service';
import { SupportSystem } from '../models/support-system.model';

import { FindSupportSystemsQuery } from './find-support-systems.query';

@QueryHandler(FindSupportSystemsQuery)
export class FindSupportSystemsHandler implements IQueryHandler<FindSupportSystemsQuery> {
	constructor(private service: SupportSystemService) {}

	async execute(query: FindSupportSystemsQuery): Promise<SupportSystem[]> {
		return this.service.getSupportSystems(query.surveyId);
	}
}
