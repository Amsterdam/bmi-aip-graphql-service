import { CreateMissingSupportSystemInput } from '../dto/create-missing-support-system.input';

export class CreateReviseSupportSystemCommand {
	public constructor(public readonly data: CreateMissingSupportSystemInput) {}
}
