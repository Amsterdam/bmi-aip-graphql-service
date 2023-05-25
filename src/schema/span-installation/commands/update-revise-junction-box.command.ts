import { UpdateReviseJunctionBoxInput } from '../dto/update-revise-junction-box.input';

export class UpdateReviseJunctionBoxCommand {
	public constructor(public readonly data: UpdateReviseJunctionBoxInput) {}
}
