import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SpanMeasureItemRepository } from '../span-measure-item.repository';
import { SpanMeasureItem } from '../models/span-measure-item.model';

import { UpdateSpanMeasureItemsUsedQuantitiesCommand } from './update-span-measure-items-used-quantities.command';

@CommandHandler(UpdateSpanMeasureItemsUsedQuantitiesCommand)
export class UpdateSpanMeasureItemsUsedQuantitiesHandler
	implements ICommandHandler<UpdateSpanMeasureItemsUsedQuantitiesCommand>
{
	constructor(private repository: SpanMeasureItemRepository) {}

	public async execute(command: UpdateSpanMeasureItemsUsedQuantitiesCommand): Promise<SpanMeasureItem[]> {
		return this.repository.updateSpanMeasureItemsUsedQuantities(command.data);
	}
}
