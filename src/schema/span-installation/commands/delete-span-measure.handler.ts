import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SpanMeasureRepository } from '../span-measure.repository';
import { SpanMeasureFactory } from '../span-measure.factory';
import { SpanMeasure } from '../models/span-measure.model';

import { DeleteSpanMeasureCommand } from './delete-span-measure.command';

@CommandHandler(DeleteSpanMeasureCommand)
export class DeleteSpanMeasureHandler implements ICommandHandler<DeleteSpanMeasureCommand> {
	constructor(private repository: SpanMeasureRepository) {}

	public async execute(command: DeleteSpanMeasureCommand): Promise<SpanMeasure> {
		return SpanMeasureFactory.CreateSpanMeasure(await this.repository.deleteSpanMeasure(command.identifier));
	}
}
