import { CreateCyclicMeasureInput } from '../dto/create-cyclic-measure.input';

export class CreateCyclicMeasureCommand {
	public constructor(public readonly data: CreateCyclicMeasureInput) {}
}
