import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { MeasureService } from '../measure.service';
import { Measure } from '../models/measure.model';

import { FindMeasuresQuery } from './find-measures.query';

@QueryHandler(FindMeasuresQuery)
export class FindMeasuresHandler implements IQueryHandler<FindMeasuresQuery> {
	constructor(private service: MeasureService) {}

	async execute({ surveyId }: FindMeasuresQuery): Promise<Measure[]> {
		return this.service.findMeasures(surveyId);
	}
}
