import { CreateObjectInput } from '../dto/create-object.input';

export class CreateObjectCommand {
	public constructor(public readonly data: CreateObjectInput) {}
}
