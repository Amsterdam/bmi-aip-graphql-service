import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ConditionRepository } from '../condition.repository';
import { Condition } from '../types/condition.repository.interface';
import { CreateConditionCommand } from '../commands/create-condition.command';

@CommandHandler(CreateConditionCommand)
export class CreateConditionHandler implements ICommandHandler<CreateConditionCommand> {
	constructor(private repository: ConditionRepository) {}

	public async execute(command: CreateConditionCommand): Promise<Condition> {
		return this.repository.createCondition(command.data);
	}
}
