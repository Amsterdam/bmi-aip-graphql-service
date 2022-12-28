import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Nen2767MigrateDecompositionService } from '../nen2767-migrate-decomposition.service';
import type { Nen2767MigrateDecompositionReturnType } from '../types';

import { Nen2767MigrateDecompositionCommand } from './nen2767-migrate-decomposition.command';

@CommandHandler(Nen2767MigrateDecompositionCommand)
export class Nen2767MigrateDecompositionHandler implements ICommandHandler<Nen2767MigrateDecompositionCommand> {
	constructor(private service: Nen2767MigrateDecompositionService) {}

	public async execute({ id }: Nen2767MigrateDecompositionCommand): Promise<Nen2767MigrateDecompositionReturnType> {
		return this.service.migrateNen2767Decomposition(id);
	}
}
