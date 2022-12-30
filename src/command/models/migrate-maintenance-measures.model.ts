import { ObjectType } from '@nestjs/graphql';

import { Nen2767MigrateDecompositionModel } from './nen2767-migrate-decomposition.model';

@ObjectType({ description: 'migrateMaintenanceMeasuresCommandResponse' })
export class MigrateMaintenanceMeasuresModel extends Nen2767MigrateDecompositionModel {}
