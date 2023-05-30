import { CreateMissingSupportSystemInput } from '../dto/create-missing-support-system.input';

export class CreateMissingSupportSystemCommand {
	public constructor(public readonly data: CreateMissingSupportSystemInput) {}
}
