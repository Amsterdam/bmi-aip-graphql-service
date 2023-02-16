import { GenerateCyclicMeasureInput } from '../dto/generate-cyclic-measure.input';

export class GenerateCyclicMeasuresCommand {
	public constructor(public readonly data: GenerateCyclicMeasureInput) {}
}
