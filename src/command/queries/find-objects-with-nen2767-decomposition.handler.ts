import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { MigrateNen2767DecompositionService } from '../migrate-nen2767-decomposition.service';
import { ObjectWithNen2767DecompositionModel } from '../models/object-with-nen2767-decomposition.model';

import { FindObjectsWithNen2767DecompositionQuery } from './find-objects-with-nen2767-decomposition.query';

@QueryHandler(FindObjectsWithNen2767DecompositionQuery)
export class FindObjectsWithNen2767DecompositionHandler
	implements IQueryHandler<FindObjectsWithNen2767DecompositionQuery>
{
	constructor(private service: MigrateNen2767DecompositionService) {}

	async execute(query: FindObjectsWithNen2767DecompositionQuery): Promise<ObjectWithNen2767DecompositionModel[]> {
		return this.service.findObjectsWithNen2767Decomposition();
	}
}
