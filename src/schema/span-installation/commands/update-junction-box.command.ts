import { UpdateJunctionBoxInput } from '../dto/update-junction-box.input';

export class UpdateJunctionBoxCommand {
	public constructor(public readonly data: UpdateJunctionBoxInput) {}
}
