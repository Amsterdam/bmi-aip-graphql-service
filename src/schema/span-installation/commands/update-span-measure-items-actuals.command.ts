import { UpdateSpanMeasureItemsActualsInput } from '../dto/update-span-measure-items-actuals-input';

export class UpdateSpanMeasureItemsActualsCommand {
	public constructor(public readonly data: UpdateSpanMeasureItemsActualsInput) {}
}
