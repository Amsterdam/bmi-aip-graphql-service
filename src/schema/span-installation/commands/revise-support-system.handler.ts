import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SupportSystemRepository } from '../support-system.repository';
import { SupportSystem } from '../types/support-system.repository.interface';
import { normalizeSupportSystemInputUtil } from '../utils/normalize-support-system-input.util';
import { ReviseSupportSystemNormalizedInput } from '../dto/update-revise-support-system-normalized.input';

import { ReviseSupportSystemCommand } from './revise-support-system.command';

@CommandHandler(ReviseSupportSystemCommand)
export class ReviseSupportSystemHandler implements ICommandHandler<ReviseSupportSystemCommand> {
	constructor(private repository: SupportSystemRepository) {}

	public async execute(command: ReviseSupportSystemCommand): Promise<SupportSystem> {
		return this.repository.reviseSupportSystem(
			normalizeSupportSystemInputUtil(command.data, new ReviseSupportSystemNormalizedInput()),
		);
	}
}
