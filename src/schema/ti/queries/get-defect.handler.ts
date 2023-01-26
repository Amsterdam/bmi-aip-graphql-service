import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { DefectService } from '../defect.service';

import { GetDefectQuery } from './get-defect.query';

@QueryHandler(GetDefectQuery)
export class GetDefectHandler implements IQueryHandler<GetDefectQuery> {
	constructor(private service: DefectService) {}

	async execute({ conditionId }: GetDefectQuery) {
		return this.service.getDefect(conditionId);
	}
}
