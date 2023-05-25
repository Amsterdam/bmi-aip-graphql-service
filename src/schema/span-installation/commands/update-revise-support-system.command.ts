import { UpdateReviseSupportSystemInput } from '../dto/update-revise-support-system.input';

export class UpdateReviseSupportSystemCommand {
	public constructor(public readonly data: UpdateReviseSupportSystemInput) {}
}
