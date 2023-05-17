import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SpanMeasureRepository } from '../span-measure.repository';
import { SpanMeasureFactory } from '../span-measure.factory';
import { SpanMeasure } from '../models/span-measure.model';

import { CreateSpanMeasureCommand } from './create-span-measure.command';

@CommandHandler(CreateSpanMeasureCommand)
export class CreateSpanMeasureHandler implements ICommandHandler<CreateSpanMeasureCommand> {
	constructor(private repository: SpanMeasureRepository) {}

	public async execute(command: CreateSpanMeasureCommand): Promise<SpanMeasure> {
		return SpanMeasureFactory.CreateSpanMeasure(await this.repository.createSpanMeasure(command.data));
	}
}
