import { CorrectCoordinatesInput } from '../dto/correct-coordinates.input';

export class CorrectCoordinatesCommand {
	public constructor(public readonly data: CorrectCoordinatesInput) {}
}
