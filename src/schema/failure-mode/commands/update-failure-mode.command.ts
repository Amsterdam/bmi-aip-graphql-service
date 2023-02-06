import { UpdateFailureModeInput } from '../dto/update-failure-mode.input';

export class UpdateFailureModeCommand {
	public constructor(public readonly data: UpdateFailureModeInput) {}
}
