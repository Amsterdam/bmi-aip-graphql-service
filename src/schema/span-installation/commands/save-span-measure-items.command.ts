import { SaveSpanMeasureItemsInput } from '../dto/save-span-measure-items-input';

export class SaveSpanMeasureItemsCommand {
	public constructor(public readonly data: SaveSpanMeasureItemsInput) {}
}
