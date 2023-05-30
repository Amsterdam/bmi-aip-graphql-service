import { UpdateMissingJunctionBoxInput } from '../dto/update-missing-junction-box.input';

export class UpdateReviseJunctionBoxCommand {
	public constructor(public readonly data: UpdateMissingJunctionBoxInput) {}
}
