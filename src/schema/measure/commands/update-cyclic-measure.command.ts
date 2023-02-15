import { UpdateCyclicMeasureInput } from 'src/schema/measure/dto/update-cyclic-measure.input';

export class UpdateCyclicMeasureCommand {
	public constructor(public readonly data: UpdateCyclicMeasureInput) {}
}
