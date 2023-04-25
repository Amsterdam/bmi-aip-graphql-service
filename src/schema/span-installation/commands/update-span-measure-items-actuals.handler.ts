import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SpanMeasureItemRepository } from '../span-measure-item.repository';
import { SpanMeasureItem } from '../models/span-measure-item.model';

import { UpdateSpanMeasureItemsActualsCommand } from './update-span-measure-items-actuals.command';

@CommandHandler(UpdateSpanMeasureItemsActualsCommand)
export class UpdateSpanMeasureItemsActualsHandler implements ICommandHandler<UpdateSpanMeasureItemsActualsCommand> {
	constructor(private repository: SpanMeasureItemRepository) {}

	public async execute(command: UpdateSpanMeasureItemsActualsCommand): Promise<SpanMeasureItem[]> {
		return this.repository.updateSpanMeasureItemsActuals(command.data);
	}
}
