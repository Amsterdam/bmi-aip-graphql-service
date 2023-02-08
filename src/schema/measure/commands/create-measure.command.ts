import { CreateMeasureInput } from '../dto/create-measure.input';

export class CreateMeasureCommand {
	public constructor(public readonly data: CreateMeasureInput) {}
}
