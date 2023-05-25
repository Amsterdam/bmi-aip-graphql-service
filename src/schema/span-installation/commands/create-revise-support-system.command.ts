import { CreateReviseSupportSystemInput } from '../dto/create-revise-support-system.input';

export class CreateReviseSupportSystemCommand {
	public constructor(public readonly data: CreateReviseSupportSystemInput) {}
}
