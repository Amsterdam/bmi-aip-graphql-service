import { CreateFailureModeInput } from '../dto/create-failure-mode.input';

export class CreateFailureModeCommand {
	public constructor(public readonly data: CreateFailureModeInput) {}
}
