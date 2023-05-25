import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SupportSystemRepository } from '../support-system.repository';
import { SupportSystem } from '../types/support-system.repository.interface';
import { normalizeSupportSystemInputUtil } from '../utils/normalize-support-system-input.util';
import { UpdateReviseSupportSystemNormalizedInput } from '../dto/update-revise-support-system-normalized.input';

import { UpdateReviseSupportSystemCommand } from './update-revise-support-system.command';

@CommandHandler(UpdateReviseSupportSystemCommand)
export class UpdateReviseSupportSystemHandler implements ICommandHandler<UpdateReviseSupportSystemCommand> {
	constructor(private repository: SupportSystemRepository) {}

	public async execute(command: UpdateReviseSupportSystemCommand): Promise<SupportSystem> {
		return this.repository.updateReviseSupportSystem(
			normalizeSupportSystemInputUtil(command.data, new UpdateReviseSupportSystemNormalizedInput()),
		);
	}
}
