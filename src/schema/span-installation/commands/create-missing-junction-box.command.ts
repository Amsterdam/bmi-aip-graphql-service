import { CreateMissingJunctionBoxInput } from '../dto/create-missing-junction-box.input';

export class CreateMissingJunctionBoxCommand {
	public constructor(public readonly data: CreateMissingJunctionBoxInput) {}
}
