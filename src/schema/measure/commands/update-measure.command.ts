import { UpdateMeasureInput } from '../dto/update-measure.input';

export class UpdateMeasureCommand {
	public constructor(public readonly data: UpdateMeasureInput) {}
}
