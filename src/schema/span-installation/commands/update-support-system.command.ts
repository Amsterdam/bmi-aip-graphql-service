import { UpdateSupportSystemInput } from '../dto/update-support-system.input';

export class UpdateSupportSystemCommand {
	public constructor(public readonly data: UpdateSupportSystemInput) {}
}
