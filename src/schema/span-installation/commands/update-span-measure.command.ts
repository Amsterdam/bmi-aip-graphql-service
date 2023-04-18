import { UpdateSpanMeasureInput } from '../dto/update-span-measure-input';

export class UpdateSpanMeasureCommand {
	public constructor(public readonly data: UpdateSpanMeasureInput) {}
}
