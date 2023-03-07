import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { SurveyService } from '../survey.service';

import { FindInspectionStandardDataByIdQuery } from './find-inspection-standard-data-by-id.query';

@QueryHandler(FindInspectionStandardDataByIdQuery)
export class FindInspectionStandardDataByIdHandler implements IQueryHandler<FindInspectionStandardDataByIdQuery> {
	constructor(private service: SurveyService) {}

	public async execute({ id }: FindInspectionStandardDataByIdQuery): Promise<JSON> {
		return this.service.findInspectionStandardDataById(id);
	}
}
