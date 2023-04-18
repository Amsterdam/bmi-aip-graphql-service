import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SpanMeasureRepository } from '../span-measure.repository';
import { SpanMeasure } from '../types/span-measure.repository.interface';

import { UpdateSpanMeasureCommand } from './update-span-measure.command';

@CommandHandler(UpdateSpanMeasureCommand)
export class UpdateSpanMeasureHandler implements ICommandHandler<UpdateSpanMeasureCommand> {
	constructor(private repository: SpanMeasureRepository) {}

	public async execute(command: UpdateSpanMeasureCommand): Promise<SpanMeasure> {
		return this.repository.updateSpanMeasure(command.data);
	}
}
