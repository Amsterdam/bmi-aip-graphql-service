import { UpdateCyclicMeasureInput } from '../dto/update-cyclic-measure.input';

export class UpdateCyclicMeasureCommand {
	public constructor(public readonly data: UpdateCyclicMeasureInput) {}
}
