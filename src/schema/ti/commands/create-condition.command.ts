import { CreateConditionInput } from '../dto/create-condition.input';

export class CreateConditionCommand {
	public constructor(public readonly data: CreateConditionInput) {}
}
