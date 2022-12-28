import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { Nen2767MigrateDecompositionService } from '../nen2767-migrate-decomposition.service';
import { Nen2767ObjectWithDecompositionModel } from '../models/nen2767-object-with-decomposition.model';

import { Nen2767FindObjectsWithDecompositionQuery } from './nen2767-find-objects-with-decomposition.query';

@QueryHandler(Nen2767FindObjectsWithDecompositionQuery)
export class Nen2767FindObjectsWithDecompositionHandler
	implements IQueryHandler<Nen2767FindObjectsWithDecompositionQuery>
{
	constructor(private service: Nen2767MigrateDecompositionService) {}

	async execute(query: Nen2767FindObjectsWithDecompositionQuery): Promise<Nen2767ObjectWithDecompositionModel[]> {
		return this.service.findObjectsWithNen2767Decomposition();
	}
}
