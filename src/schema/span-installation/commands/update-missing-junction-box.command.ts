import { ReviseJunctionBoxInput } from '../dto/update-missing-junction-box.input';

export class ReviseJunctionBoxCommand {
	public constructor(public readonly data: ReviseJunctionBoxInput) {}
}
