import { CreateObjectInput } from '../dto/create-object.input';

export class CreateObjectsCommand {
	public constructor(public readonly data: CreateObjectInput[]) {}
}
