import { UpdateMissingSupportSystemInput } from '../dto/update-missing-support-system.input';

export class UpdateReviseSupportSystemCommand {
	public constructor(public readonly data: UpdateMissingSupportSystemInput) {}
}
