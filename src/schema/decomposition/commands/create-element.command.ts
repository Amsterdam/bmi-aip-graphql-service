import { CreateElementInput } from '../dto/create-element.input';

export class CreateElementCommand {
	public constructor(public readonly data: CreateElementInput) {}
}
