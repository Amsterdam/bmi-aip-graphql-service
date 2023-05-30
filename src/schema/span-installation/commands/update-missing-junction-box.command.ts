import { UpdateMissingJunctionBoxInput } from '../dto/update-missing-junction-box.input';

export class UpdateMissingJunctionBoxCommand {
	public constructor(public readonly data: UpdateMissingJunctionBoxInput) {}
}
