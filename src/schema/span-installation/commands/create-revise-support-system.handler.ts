import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SupportSystemRepository } from '../support-system.repository';
import { SupportSystem } from '../types/support-system.repository.interface';
import { normalizeSupportSystemInputUtil } from '../utils/normalize-support-system-input.util';
import { CreateReviseSupportSystemNormalizedInput } from '../dto/create-revise-support-system-normalized.input';

import { CreateReviseSupportSystemCommand } from './create-revise-support-system.command';

@CommandHandler(CreateReviseSupportSystemCommand)
export class CreateReviseSupportSystemHandler implements ICommandHandler<CreateReviseSupportSystemCommand> {
	constructor(private repository: SupportSystemRepository) {}

	public async execute(command: CreateReviseSupportSystemCommand): Promise<SupportSystem> {
		return this.repository.createReviseSupportSystem(
			normalizeSupportSystemInputUtil(command.data, new CreateReviseSupportSystemNormalizedInput()),
		);
	}
}
