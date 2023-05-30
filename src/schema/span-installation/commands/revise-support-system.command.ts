import { ReviseSupportSystemInput } from '../dto/revise-support-system.input';

export class ReviseSupportSystemCommand {
	public constructor(public readonly data: ReviseSupportSystemInput) {}
}
