import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MeasureRepository } from '../measure.repository';
import { Measure } from '../types/measure.repository.interface';
import { CreateMeasureCommand } from '../commands/create-measure.command';

@CommandHandler(CreateMeasureCommand)
export class CreateMeasureHandler implements ICommandHandler<CreateMeasureCommand> {
	constructor(private repository: MeasureRepository) {}

	public async execute(command: CreateMeasureCommand): Promise<Measure> {
		return this.repository.createMeasure(command.data);
	}
}
