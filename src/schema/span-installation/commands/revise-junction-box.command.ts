import { ReviseJunctionBoxInput } from '../dto/revise-junction-box.input';

export class ReviseJunctionBoxCommand {
	public constructor(public readonly data: ReviseJunctionBoxInput) {}
}
