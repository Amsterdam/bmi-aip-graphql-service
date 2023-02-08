import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MigrateMaintenanceMeasuresService } from '../migrate-maintenance-measures.service';
import type { MigrateMaintenanceMeasuresReturnType } from '../types';

import { MigrateMaintenanceMeasuresCommand } from './migrate-maintenance-measures.command';

@CommandHandler(MigrateMaintenanceMeasuresCommand)
export class MigrateMaintenanceMeasuresHandler implements ICommandHandler<MigrateMaintenanceMeasuresCommand> {
	constructor(private service: MigrateMaintenanceMeasuresService) {}

	public async execute({ id }: MigrateMaintenanceMeasuresCommand): Promise<MigrateMaintenanceMeasuresReturnType> {
		return this.service.migrateMaintenanceMeasures(id);
	}
}
