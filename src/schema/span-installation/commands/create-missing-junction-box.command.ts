import { CreateMissingJunctionBoxInput } from '../dto/create-missing-junction-box.input';

export class CreateReviseJunctionBoxCommand {
	public constructor(public readonly data: CreateMissingJunctionBoxInput) {}
}
