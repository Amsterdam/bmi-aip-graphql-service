import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { FailureModeService } from '../failure-mode.service';
import { FailureMode } from '../models/failure-mode.model';

import { FindFailureModesQuery } from './find-failure-modes.query';

@QueryHandler(FindFailureModesQuery)
export class FindFailureModesHandler implements IQueryHandler<FindFailureModesQuery> {
	constructor(private service: FailureModeService) {}

	async execute({ surveyId }: FindFailureModesQuery): Promise<FailureMode[]> {
		return this.service.findFailureModes(surveyId);
	}
}
