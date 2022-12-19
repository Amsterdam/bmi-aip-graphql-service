import { Injectable } from '@nestjs/common';

import { MigrateNen2767DecompositionRepository } from './migrate-nen2767-decomposition.repository';
import type { MigrateNen2767DecompositionReturnType } from './types';
import { ObjectWithNen2767DecompositionModel } from './models/object-with-nen2767-decomposition.model';

@Injectable()
export class MigrateNen2767DecompositionService {
	public constructor(private readonly repo: MigrateNen2767DecompositionRepository) {}

	async findObjectsWithNen2767Decomposition(): Promise<ObjectWithNen2767DecompositionModel[]> {
		const objects = await this.repo.findObjectsWithNen2767Decomposition();
		return objects.map(({ id, code }) => {
			const objectWithNen2767Decomposition = new ObjectWithNen2767DecompositionModel();
			objectWithNen2767Decomposition.id = id;
			objectWithNen2767Decomposition.code = code;
			return objectWithNen2767Decomposition;
		});
	}

	migrateNen2767Decomposition(objectId: string): Promise<MigrateNen2767DecompositionReturnType> {
		return this.repo.migrateNen2767Decomposition(objectId);
	}
}
