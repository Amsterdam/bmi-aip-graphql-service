import { UpdateMissingSupportSystemInput } from '../dto/update-missing-support-system.input';

export class UpdateMissingSupportSystemCommand {
	public constructor(public readonly data: UpdateMissingSupportSystemInput) {}
}
