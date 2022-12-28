import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MeasureRepository } from '../measure.repository';
import { Measure } from '../types/measure.repository.interface';
import { UpdateMeasureCommand } from '../commands/update-measure.command';

@CommandHandler(UpdateMeasureCommand)
export class UpdateMeasureHandler implements ICommandHandler<UpdateMeasureCommand> {
	constructor(private repository: MeasureRepository) {}

	public async execute(command: UpdateMeasureCommand): Promise<Measure> {
		return this.repository.updateMeasure(command.data);
	}
}
