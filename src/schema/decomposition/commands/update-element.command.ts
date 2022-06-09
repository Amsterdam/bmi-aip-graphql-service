import { UpdateElementInput } from '../dto/update-element.input';

export class UpdateElementCommand {
	public constructor(public readonly data: UpdateElementInput) {}
}
