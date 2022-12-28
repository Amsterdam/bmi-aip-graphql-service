import { UpdateCyclicMeasureInput } from 'src/schema/cyclic-measure/dto/update-cyclic-measure.input';

export class UpdateCyclicMeasureCommand {
	public constructor(public readonly data: UpdateCyclicMeasureInput) {}
}
