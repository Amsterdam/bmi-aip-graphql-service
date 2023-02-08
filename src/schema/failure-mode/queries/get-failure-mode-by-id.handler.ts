import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { FailureModeService } from '../failure-mode.service';

import { GetFailureModeByIdQuery } from './get-failure-mode-by-id.query';

@QueryHandler(GetFailureModeByIdQuery)
export class GetFailureModeByIdHandler implements IQueryHandler<GetFailureModeByIdQuery> {
	constructor(private service: FailureModeService) {}

	async execute({ failureModeId }: GetFailureModeByIdQuery) {
		return failureModeId ? this.service.getFailureMode(failureModeId) : null;
	}
}
