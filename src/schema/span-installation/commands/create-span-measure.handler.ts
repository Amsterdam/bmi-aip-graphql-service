import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SpanMeasureRepository } from '../span-measure.repository';
import { SpanMeasure } from '../types/span-measure.repository.interface';

import { CreateSpanMeasureCommand } from './create-span-measure.command';

@CommandHandler(CreateSpanMeasureCommand)
export class CreateSpanMeasureHandler implements ICommandHandler<CreateSpanMeasureCommand> {
	constructor(private repository: SpanMeasureRepository) {}

	public async execute(command: CreateSpanMeasureCommand): Promise<SpanMeasure> {
		return this.repository.createSpanMeasure(command.data);
	}
}
