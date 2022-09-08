import { UpdateObjectInput } from '../dto/update-object.input';

export class UpdateObjectCommand {
	public constructor(public readonly data: UpdateObjectInput) {}
}
