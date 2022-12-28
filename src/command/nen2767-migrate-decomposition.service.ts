import { Injectable } from '@nestjs/common';

import { Nen2767MigrateDecompositionRepository } from './nen2767-migrate-decomposition.repository';
import type { Nen2767MigrateDecompositionReturnType } from './types';
import { Nen2767ObjectWithDecompositionModel } from './models/nen2767-object-with-decomposition.model';

@Injectable()
export class Nen2767MigrateDecompositionService {
	public constructor(private readonly repo: Nen2767MigrateDecompositionRepository) {}

	async findObjectsWithNen2767Decomposition(): Promise<Nen2767ObjectWithDecompositionModel[]> {
		const objects = await this.repo.findObjectsWithNen2767Decomposition();
		return objects.map(({ id, code }) => {
			const objectWithNen2767Decomposition = new Nen2767ObjectWithDecompositionModel();
			objectWithNen2767Decomposition.id = id;
			objectWithNen2767Decomposition.code = code;
			return objectWithNen2767Decomposition;
		});
	}

	migrateNen2767Decomposition(objectId: string): Promise<Nen2767MigrateDecompositionReturnType> {
		return this.repo.migrateNen2767Decomposition(objectId);
	}
}
