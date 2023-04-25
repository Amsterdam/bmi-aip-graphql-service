import { CreateSpanMeasureInput } from '../dto/create-span-measure.input';

export class CreateSpanMeasureCommand {
	public constructor(public readonly data: CreateSpanMeasureInput) {}
}
