import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MigrateNen2767DecompositionService } from '../migrate-nen2767-decomposition.service';
import type { MigrateNen2767DecompositionReturnType } from '../types';

import { MigrateNen2767DecompositionCommand } from './migrate-nen2767-decomposition.command';

@CommandHandler(MigrateNen2767DecompositionCommand)
export class MigrateNen2767DecompositionHandler implements ICommandHandler<MigrateNen2767DecompositionCommand> {
	constructor(private service: MigrateNen2767DecompositionService) {}

	public async execute({ id }: MigrateNen2767DecompositionCommand): Promise<MigrateNen2767DecompositionReturnType> {
		return this.service.migrateNen2767Decomposition(id);
	}
}
