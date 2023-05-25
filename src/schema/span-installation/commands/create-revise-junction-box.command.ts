import { CreateReviseJunctionBoxInput } from '../dto/create-revise-junction-box.input';

export class CreateReviseJunctionBoxCommand {
	public constructor(public readonly data: CreateReviseJunctionBoxInput) {}
}
