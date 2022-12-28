import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MeasureRepository } from '../measure.repository';
import { Measure } from '../types/measure.repository.interface';
import { DeleteMeasureCommand } from '../commands/delete-measure.command';

@CommandHandler(DeleteMeasureCommand)
export class DeleteMeasureHandler implements ICommandHandler<DeleteMeasureCommand> {
	constructor(private repository: MeasureRepository) {}

	public async execute(command: DeleteMeasureCommand): Promise<Measure> {
		return this.repository.deleteMeasure(command.identifier);
	}
}
