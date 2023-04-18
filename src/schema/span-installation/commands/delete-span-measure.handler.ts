import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SpanMeasureRepository } from '../span-measure.repository';
import { SpanMeasure } from '../types/span-measure.repository.interface';

import { DeleteSpanMeasureCommand } from './delete-span-measure.command';

@CommandHandler(DeleteSpanMeasureCommand)
export class DeleteSpanMeasureHandler implements ICommandHandler<DeleteSpanMeasureCommand> {
	constructor(private repository: SpanMeasureRepository) {}

	public async execute(command: DeleteSpanMeasureCommand): Promise<SpanMeasure> {
		return this.repository.deleteSpanMeasure(command.identifier);
	}
}
