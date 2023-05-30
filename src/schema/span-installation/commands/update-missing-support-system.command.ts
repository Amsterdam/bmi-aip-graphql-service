import { ReviseSupportSystemInput } from '../dto/update-missing-support-system.input';

export class ReviseSupportSystemCommand {
	public constructor(public readonly data: ReviseSupportSystemInput) {}
}
