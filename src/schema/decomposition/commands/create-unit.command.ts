import { CreateUnitInput } from '../dto/create-unit.input';

export class CreateUnitCommand {
	public constructor(public readonly data: CreateUnitInput) {}
}
