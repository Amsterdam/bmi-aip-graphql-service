import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SpanMeasureRepository } from '../span-measure.repository';
import { SpanMeasureFactory } from '../span-measure.factory';
import { SpanMeasure } from '../models/span-measure.model';

import { UpdateSpanMeasureCommand } from './update-span-measure.command';

@CommandHandler(UpdateSpanMeasureCommand)
export class UpdateSpanMeasureHandler implements ICommandHandler<UpdateSpanMeasureCommand> {
	constructor(private repository: SpanMeasureRepository) {}

	public async execute(command: UpdateSpanMeasureCommand): Promise<SpanMeasure> {
		return SpanMeasureFactory.CreateSpanMeasure(await this.repository.updateSpanMeasure(command.data));
	}
}
