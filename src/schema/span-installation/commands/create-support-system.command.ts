import { CreateSupportSystemInput } from '../dto/create-support-system.input';

export class CreateSupportSystemCommand {
	public constructor(public readonly data: CreateSupportSystemInput) {}
}
