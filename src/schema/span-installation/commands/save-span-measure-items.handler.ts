import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SpanMeasureItemRepository } from '../span-measure-item.repository';
import { SpanMeasureItem } from '../models/span-measure-item.model';

import { SaveSpanMeasureItemsCommand } from './save-span-measure-items.command';

@CommandHandler(SaveSpanMeasureItemsCommand)
export class SaveSpanMeasureItemsHandler implements ICommandHandler<SaveSpanMeasureItemsCommand> {
	constructor(private repository: SpanMeasureItemRepository) {}

	public async execute(command: SaveSpanMeasureItemsCommand): Promise<SpanMeasureItem[]> {
		return this.repository.saveSpanMeasureItems(command.data);
	}
}
