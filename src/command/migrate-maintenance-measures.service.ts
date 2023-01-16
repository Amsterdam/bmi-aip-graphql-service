import { Injectable } from '@nestjs/common';

import { Nen2767ObjectWithDecompositionModel } from './models/nen2767-object-with-decomposition.model';
import { MigrateMaintenanceMeasuresRepository } from './migrate-maintenance-measures.repository';
import { ObjectWithMaintenanceMeasuresModel } from './models/object-with-maintenance-measures.model';
import type { MigrateMaintenanceMeasuresReturnType } from './types';

@Injectable()
export class MigrateMaintenanceMeasuresService {
	public constructor(private readonly repo: MigrateMaintenanceMeasuresRepository) {}

	async findObjectsWithMaintenanceMeasures(): Promise<Nen2767ObjectWithDecompositionModel[]> {
		const objects = await this.repo.findObjectsWithMaintenanceMeasures();
		return objects.map(({ id, code }) => {
			const objectWithNen2767Decomposition = new ObjectWithMaintenanceMeasuresModel();
			objectWithNen2767Decomposition.id = id;
			objectWithNen2767Decomposition.code = code;
			return objectWithNen2767Decomposition;
		});
	}

	migrateMaintenanceMeasures(objectId: string): Promise<MigrateMaintenanceMeasuresReturnType> {
		return this.repo.migrateMaintenanceMeasures(objectId);
	}
}
