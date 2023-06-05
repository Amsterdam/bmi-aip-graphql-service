import { UpdateSpanMeasureItemsUsedQuantitiesInput } from '../dto/update-span-measure-items-used-quantities-input';

export class UpdateSpanMeasureItemsUsedQuantitiesCommand {
	public constructor(public readonly data: UpdateSpanMeasureItemsUsedQuantitiesInput) {}
}
