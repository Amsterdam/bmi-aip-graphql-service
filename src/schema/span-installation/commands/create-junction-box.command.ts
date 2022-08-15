import { CreateJunctionBoxInput } from '../dto/create-junction-box.input';

export class CreateJunctionBoxCommand {
	public constructor(public readonly data: CreateJunctionBoxInput) {}
}
